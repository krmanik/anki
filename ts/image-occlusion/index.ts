// Copyright: Ankitects Pty Ltd and contributors
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import "./image-occlusion-base.scss";

import { ModuleName, setupI18n } from "../lib/i18n";
import { checkNightMode } from "../lib/nightmode";
import ImageOcclusionPage from "./ImageOcclusionPage.svelte";
import { getImageClozeMetadata } from "./lib";
import protobuf from "protobufjs";
import { Decks, decks as decksService } from "../lib/proto";

const i18n = setupI18n({
    modules: [
        ModuleName.IMPORTING,
        ModuleName.DECKS,
        ModuleName.EDITING,
        ModuleName.NOTETYPES,
    ],
});

const gettingDecks = decksService.getDeckNames(
    Decks.GetDeckNamesRequest.create({
        skipEmptyDefault: false,
        includeFiltered: false,
    }),
);

export async function setupImageOcclusion(path: string): Promise<ImageOcclusionPage> {
    checkNightMode();

    const gettingmetadata = getImageClozeMetadata(path);
    const [metadata, decks] = await Promise.all([gettingmetadata, gettingDecks, i18n]);

    let b64encoded = protobuf.util.base64.encode(
        metadata.data,
        0,
        metadata.data.length,
    );
    let bs64 = "data:image/png;base64," + b64encoded;

    return new ImageOcclusionPage({
        target: document.body,
        props: {
            path: path,
            data: bs64,
            deckNameIds: decks.entries,
            deckId: metadata.deckId ? metadata.deckId : null,
        },
    });
}
