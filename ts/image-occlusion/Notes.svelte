<script lang="ts">
    import Container from "../components/Container.svelte";
    import { noteFieldsData } from "./store";
    import Col from "../components/Col.svelte";
    import Row from "../components/Row.svelte";
    import DeckSelector from "./DeckSelector.svelte";
    import type { Decks } from "../lib/proto";
    import Tags from "./Tags.svelte";
    import * as tr from "@tslib/ftl";

    export let deckNameIds: Decks.DeckNameId[];
    export let deckId: number | null;
    let globalTags: string[] = [];

    let notesFields = [
        { id: "header", title: tr.notetypesHeader() },
        { id: "notes", title: tr.notetypesNotesField() },
    ];
</script>

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
                <textarea class="text-area" bind:value={$noteFieldsData[field.id]} />
            </Row>
        </Container>
    {/each}
    <Container>
        <Tags bind:globalTags />
    </Container>
</Container>

<style lang="scss">
    .text-area {
        height: 80px;
    }
</style>
