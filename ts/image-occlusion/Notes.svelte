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
    <Row --cols={2}>
        <Col --col-size={1} breakpoint="md">
            <Container>
                {#if deckId}
                    <DeckSelector {deckNameIds} bind:deckId />
                {/if}
            </Container>
        </Col>
    </Row>
    {#each notesFields as field}
        <Container>
            <div>{field.title}</div>
            <textarea class="text-area" bind:value={$noteFieldsData[field.id]} />
        </Container>
    {/each}
    <Tags bind:globalTags />
</Container>

<style lang="scss">
    .text-area {
        height: 80px;
    }
</style>
