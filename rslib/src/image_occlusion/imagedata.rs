// Copyright: Ankitects Pty Ltd and contributors
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

use std::{fs::read, path::Path, sync::Arc};

use crate::notetype::{CardGenContext, Notetype, NotetypeConfig};
pub use crate::pb::image_occlusion::ImageClozeMetadata;
use crate::{media::MediaManager, prelude::*};

impl Collection {
    pub fn get_image_cloze_metadata(&mut self, path: &str) -> Result<ImageClozeMetadata> {
        let mut metadata = ImageClozeMetadata {
            ..Default::default()
        };

        metadata.data = read(path)?;
        metadata.deck_id = 1;

        Ok(metadata)
    }

    pub fn add_image_occlusion_notes(
        &mut self,
        image_path: &str,
        target_deck: DeckId,
        occlusions: &str,
        header: &str,
        notes: &str,
        tags: Vec<String>,
    ) -> Result<OpOutput<()>> {
        // image file
        let image_bytes = read(image_path)?;
        let image_filename = Path::new(&image_path)
            .file_name()
            .unwrap()
            .to_str()
            .unwrap()
            .to_string();

        let mgr = MediaManager::new(&self.media_folder, &self.media_db)?;
        let mut ctx = mgr.dbctx();
        let actual_image_name_after_adding =
            mgr.add_file(&mut ctx, &image_filename, &image_bytes)?;

        let image_tag = format!(
            "<img id='img' src='{}'></img>",
            &actual_image_name_after_adding
        );

        self.transact(Op::ImageOcclusion, |col| {
            let nt = col.get_or_create_io_notetype()?;

            let mut note = nt.new_note();
            note.set_field(0, occlusions)?;
            note.set_field(1, header)?;
            note.set_field(2, &image_tag)?;
            note.set_field(3, notes)?;
            note.tags = tags;

            let last_deck = col.get_last_deck_added_to_for_notetype(note.notetype_id);
            let ctx = CardGenContext::new(nt.as_ref(), last_deck, col.usn()?);
            let norm = col.get_config_bool(BoolKey::NormalizeNoteText);
            col.add_note_inner(&ctx, &mut note, target_deck, norm)?;

            Ok(())
        })
    }

    fn get_or_create_io_notetype(&mut self) -> Result<Arc<Notetype>> {
        let name = self.tr.editing_image_occlusion().to_string();
        let nt = match self.get_notetype_by_name(&name)? {
            Some(nt) => nt,
            None => {
                self.add_io_notetype(&name)?;
                self.get_notetype_by_name(&name)?
                    .ok_or(AnkiError::NotFound { source: todo!() })?
            }
        };
        if nt.fields.len() < 4 {
            Err(AnkiError::TemplateError {
                info: "IO notetype must have 4+ fields".to_string(),
            })
        } else {
            Ok(nt)
        }
    }

    fn add_io_notetype(&mut self, name: &str) -> Result<()> {
        let usn = self.usn()?;
        let mut notetype = Notetype {
            name: name.into(),
            config: NotetypeConfig::new_cloze(),
            ..Default::default()
        };

        let occlusion_field = self.tr.notetypes_occlusions_field().to_string();
        let header_field = self.tr.notetypes_header().to_string();
        let image_field = self.tr.notetypes_image_field().to_string();
        let notes_field = self.tr.notetypes_notes_field().to_string();

        notetype.set_modified(usn);
        
        notetype.add_field(&occlusion_field);
        notetype.add_field(&header_field);
        notetype.add_field(&image_field);
        notetype.add_field(&notes_field);

        notetype.add_template(
            notetype.name.clone(),
            // include front template and replace with i18n fields name
            include_str!("io_front_template.html")
                .replace("Occlusions", &occlusion_field)
                .replacen("Image", &image_field, 1),
            // include back template and replace with i18n fields name
            include_str!("io_back_template.html")
                .replace("Occlusions", &occlusion_field)
                .replace("Header", &header_field)
                .replace("Notes", &notes_field)
                .replacen("Image", &image_field, 1),
        );
        self.add_notetype_inner(&mut notetype, usn, false)?;
        Ok(())
    }
}
