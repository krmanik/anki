<script lang="ts">
    import DropdownItem from "../../components/DropdownItem.svelte";
    import IconButton from "../../components/IconButton.svelte";
    import Popover from "../../components/Popover.svelte";
    import WithFloating from "../../components/WithFloating.svelte";
    import IconConstrain from "../../components/IconConstrain.svelte";
    import { textFormattingAlign } from "./lib";
    import { execCommand } from "../../domlib";

    export let iconSize;
    let showFloating = false;

    let formatAlign = textFormattingAlign[0];
    let formatAlignTitle = formatAlign.title;
    let formatAlignId = formatAlign.id;
    let formatAlignIcon = formatAlign.icon;

    const onChange = (id: number) => {
        formatAlignId = textFormattingAlign[id].id;
        formatAlignTitle = textFormattingAlign[id].title;
        formatAlignIcon = textFormattingAlign[id].icon;
        showFloating = !showFloating;
    };

    const textFormat = (tool: { name; title; icon; action }) => {
        execCommand(tool.action, false, tool.name);
    };
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
        >{@html formatAlignIcon}</IconButton
    >
    <Popover slot="floating" --popover-padding-inline="0">
        {#each textFormattingAlign as tool}
            <DropdownItem
                on:click={() => {
                    onChange(tool.id);
                    textFormat(tool);
                }}
            >
                <IconConstrain {iconSize}>{@html tool.icon}</IconConstrain>
                <span class="d-flex-inline ps-3">{tool.title}</span>
            </DropdownItem>
        {/each}
    </Popover>
</WithFloating>
