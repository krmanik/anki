import NotesToolbar from "./NotesToolbar.svelte";

export async function setupNotesToolbar(): Promise<NotesToolbar> {
    return new NotesToolbar();
}
