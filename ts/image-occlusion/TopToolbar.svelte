<script>
    import IconButton from "../components/IconButton.svelte";
    import { undoRedoTools } from "./tools/tool-undo-redo";
    import { cursorTools, zoomTools } from "./tools/more-tools";

    export let activeTool = "cursor";
    export let canvas;
    export let instance;
</script>

<div class="top-tool-bar-container">
    {#each undoRedoTools as undoRedoTool}
        <IconButton
            class="top-tool-icon-button"
            iconSize={110}
            on:click={() => {
                undoRedoTool.action(canvas);
            }}
        >
            {@html undoRedoTool.icon}
        </IconButton>
    {/each}

    {#if activeTool === "cursor"}
        {#each cursorTools as cursorBottomTool}
            <IconButton
                class="top-tool-icon-button"
                iconSize={110}
                on:click={() => {
                    cursorBottomTool.action(canvas);
                }}
            >
                {@html cursorBottomTool.icon}
            </IconButton>
        {/each}
    {/if}

    {#if activeTool === "magnify"}
        {#each zoomTools as zoomBottomTool}
            <IconButton
                class="top-tool-icon-button"
                iconSize={110}
                on:click={() => {
                    zoomBottomTool.action(instance);
                }}
            >
                {@html zoomBottomTool.icon}
            </IconButton>
        {/each}
    {/if}
</div>

<style>
    .top-tool-bar-container {
        position: fixed;
        top: 42px;
        left: 36px;
        width: 100%;
        border-right: 1px solid #e3e3e3;
        overflow-y: auto;
        z-index: 99;
        background: white;
    }

    :global(.top-tool-icon-button) {
        border: unset;
        display: inline;
        width: 36px;
        height: 36px;
        margin: unset;
        padding: 8px !important;
    }
</style>
