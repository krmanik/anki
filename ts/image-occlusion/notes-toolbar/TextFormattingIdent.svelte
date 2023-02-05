<script lang="ts">
    import { execCommand } from "../../domlib";
    import IconButton from "../../components/IconButton.svelte";
    import { textFormattingIdent } from "./lib";

    export let iconSize;

    const textFormat = (tool: { name; title; icon; action }) => {
        execCommand(tool.action, false, tool.name);
    };
</script>

{#each textFormattingIdent as tool}
    <IconButton
        class="note-tool-icon-button"
        {iconSize}
        on:click={(e) => {
            textFormat(tool);
        }}>{@html tool.icon}</IconButton
    >
{/each}
