<script lang="ts">
    import IconButton from "../components/IconButton.svelte";
    import { tools } from "./tools/tool-buttons";
    import { enableSelectable, fillShapeColor, stopDraw } from "./tools/lib";
    import {
        addText,
        drawCircle,
        drawEllipse,
        drawPolygon,
        drawRectangle,
        drawSquare,
        drawTriangle,
    } from "./tools/index";
    import ColorDialog from "./ColorDialog.svelte";
    import TopToolbar from "./TopToolbar.svelte";

    export let instance;
    export let canvas;

    let activeTool = "cursor";

    function setActive(toolId) {
        activeTool = toolId;
        disableFunctions();

        switch (toolId) {
            case "cursor":
                enableSelectable(canvas, true);
                break;
            case "magnify":
                instance.resume();
                break;
            case "draw-triangle":
                drawTriangle(canvas);
                break;
            case "draw-square":
                drawSquare(canvas);
                break;
            case "draw-rectangle":
                drawRectangle(canvas);
                break;
            case "draw-circle":
                drawCircle(canvas);
                break;
            case "draw-ellipse":
                drawEllipse(canvas);
                break;
            case "draw-polygon":
                drawPolygon(canvas, instance);
                break;                
            case "add-text":
                addText(canvas);
                break;
            case "shape-fill-color":
                colorFillDlgNode ? colorFillDlgNode.click() : "";
                enableSelectable(canvas, true);
                break;
            default:
                break;
        }
    }

    const disableFunctions = () => {
        instance.pause();
        stopDraw(canvas);
        enableSelectable(canvas, false);
    };

    let colorFillDlgNode: HTMLElement;
    const setFillColorDialog = (node: HTMLElement) => {
        colorFillDlgNode = node;
        colorFillDlgNode.click();
        colorFillDlgNode.addEventListener("input", changeShapeFillColor);
    };

    const changeShapeFillColor = (node: any) => {
        if (node) {
            fillShapeColor(canvas, node.target.value);
            console.log(node.target.value);
        }
    };
</script>

<TopToolbar {canvas} {activeTool} {instance} />

<div class="tool-bar-container">
    <div>
        {#each tools as tool}
            <IconButton
                class="tool-icon-button {activeTool == tool.id ? 'active-tool' : ''}"
                iconSize={124}
                active={activeTool === tool.id}
                on:click={() => {
                    setActive(tool.id);
                }}>{@html tool.icon}</IconButton
            >
        {/each}
    </div>
</div>

{#if activeTool === "choose-color"}
    <ColorDialog />
{/if}

{#if activeTool === "shape-fill-color"}
    <input
        type="color"
        style="opacity:0; position:absolute;"
        use:setFillColorDialog
        on:change={changeShapeFillColor}
        on:keyup={changeShapeFillColor}
    />
{/if}

<style>
    .tool-bar-container {
        position: fixed;
        top: 42px;
        left: 0;
        height: 100%;
        border-right: 1px solid #e3e3e3;
        overflow-y: auto;
        width: 36px;
        z-index: 99;
        background: white;
    }

    :global(.tool-icon-button) {
        border: unset;
        display: block;
        width: 36px;
        height: 36px;
        margin: unset;
        padding: 8px !important;
    }

    :global(.active-tool) {
        color: red !important;
        background: unset !important;
    }
</style>
