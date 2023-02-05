<script lang="ts">
    import DropdownItem from "../../components/DropdownItem.svelte";
    import IconButton from "../../components/IconButton.svelte";
    import Popover from "../../components/Popover.svelte";
    import WithFloating from "../../components/WithFloating.svelte";
    import IconConstrain from "../../components/IconConstrain.svelte";
    import { textFormattingHeader } from "./lib";
    import { execCommand } from "../../domlib";

    export let iconSize;
    let showFloating = false;

    let formattingHeader = textFormattingHeader[0];
    let formatHeaderTitle = formattingHeader.title;
    let formatHeaderId = formattingHeader.id;
    let formatHeaderIcon = formattingHeader.icon;
    let formatHeaderValue = formattingHeader.value;

    const headerOnChange = (id: number) => {
        formatHeaderId = textFormattingHeader[id].id;
        formatHeaderTitle = textFormattingHeader[id].title;
        formatHeaderIcon = textFormattingHeader[id].icon;
        formatHeaderValue = textFormattingHeader[id].value;
        showFloating = !showFloating;
    };

    $: execCommand("formatBlock", false, formatHeaderValue);
</script>

<WithFloating show={showFloating} inline on:close={() => (showFloating = false)}>
    <IconButton
        class="note-tool-icon-button"
        slot="reference"
        {iconSize}
        --border-left-radius="5px"
        --border-right-radius="5px"
        --padding-inline="8px"
        on:click={() => (showFloating = !showFloating)}
        >{@html formatHeaderIcon}</IconButton
    >
    <Popover slot="floating" --popover-padding-inline="0">
        {#each textFormattingHeader as tool}
            <DropdownItem
                on:click={() => {
                    headerOnChange(tool.id);
                }}
            >
                <IconConstrain {iconSize}>{@html tool.icon}</IconConstrain>
                <span class="d-flex-inline ps-3">{tool.title}</span>
            </DropdownItem>
        {/each}
    </Popover>
</WithFloating>

<style lang="scss">
    :global(.floating-reference) {
        line-height: unset !important;
    }
</style>
