<script lang="ts">
    import IconButton from "../../components/IconButton.svelte";
    import { textFormatting } from "./lib";
    import { execCommand } from "../../domlib";

    export let iconSize;

    const setActiveTool = (tool: { name; title; icon; action }) => {
        if (tool.name === "hr") {
            return;
        }

        let elem = document.getElementById("note-tool-" + tool.name)!;
        elem.classList.toggle("active-note-tool");
    };

    const textFormat = (tool: { name; title; icon; action }) => {
        execCommand(tool.action, false, tool.name);
    };
</script>

{#each textFormatting as tool}
    <IconButton
        id={"note-tool-" + tool.name}
        class="note-tool-icon-button"
        {iconSize}
        on:click={(e) => {
            // setActiveTool(tool);
            textFormat(tool);
        }}>{@html tool.icon}</IconButton
    >
{/each}

<style lang="scss">
    :global(.note-tool-icon-button) {
        padding: 4px !important;
        border-radius: 2px !important;
    }

    :global(.active-note-tool) {
        background-color: #808080 !important;
        color: white !important;
    }
</style>
