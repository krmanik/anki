<script lang="ts">
    import Container from "../components/Container.svelte";
    import { noteFieldsData } from "./store";
    import Col from "../components/Col.svelte";
    import Row from "../components/Row.svelte";
    import DeckSelector from "./DeckSelector.svelte";
    import type { Decks } from "../lib/proto";
    import Tags from "./Tags.svelte";
    import * as tr from "@tslib/ftl";
    import NotesToolbar from "./notes-toolbar/NotesToolbar.svelte";

    export let deckNameIds: Decks.DeckNameId[];
    export let deckId: number | null;
    let globalTags: string[] = [];

    let notesFields = [
        { id: "header", title: tr.notetypesHeader() },
        { id: "notes", title: tr.notetypesNotesField() },
    ];

    const contentEditable = (id) => {
        const textArea = document.getElementById(
            "img-occ-html-" + id,
        )! as HTMLTextAreaElement;
        const textEditor = document.getElementById("img-occ-preview-" + id)!;
        textArea.value = textEditor.innerHTML;
    };
</script>

<div class="note-toolbar">
    <NotesToolbar />
</div>

<Container>
    <Row --cols={1}>
        <Container>
            {#if deckId}
                <DeckSelector {deckNameIds} bind:deckId />
            {/if}
        </Container>
    </Row>
    {#each notesFields as field}
        <Container>
            <Row --cols={1}>
                <Col --col-size={1}>
                    {field.title}
                </Col>
            </Row>
            <Row --cols={1}>
                <div id="note-container">
                    <div
                        on:input={(e) => {
                            contentEditable(field.id);
                        }}
                        class="text-editor"
                        id="img-occ-preview-{field.id}"
                        contenteditable
                    />
                    <textarea
                        class="text-area"
                        bind:value={$noteFieldsData[field.id]}
                        id="img-occ-html-{field.id}"
                    />
                </div>
            </Row>
        </Container>
    {/each}
    <Container>
        <Tags bind:globalTags />
    </Container>
</Container>

<style lang="scss">
    .text-area {
        height: 120px;
        width: 100%;
        display: none;
        background: white;
        border: 1px solid #ccc;
        outline: none;
        resize: none;
        overflow: auto;
    }

    .text-editor {
        height: 80px;
        border: 1px solid #ccc;
        padding: 5px;
        overflow: auto;
        outline: none;
        background: white;
    }

    .note-toolbar {
        margin-left: 14px;
    }
</style>
