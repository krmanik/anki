<script lang="ts">
    import IconButton from "../../components/IconButton.svelte";
    import { moreTools } from "./lib";
    export let iconSize;
</script>

{#each moreTools as tool}
    <IconButton class="note-tool-icon-button" {iconSize} on:click={() => tool.action()}
        >{@html tool.icon}</IconButton
    >
{/each}
