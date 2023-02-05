<script lang="ts">
    import TextFormatting from "./TextFormatting.svelte";
    import TextFormattingHeader from "./TextFormattingHeader.svelte";
    import TextFormattingAlign from "./TextFormattingAlign.svelte";
    import TextFormattingIdent from "./TextFormattingIdent.svelte";
    import MoreTools from "./MoreTools.svelte";

    let iconSize = 80;
</script>

<TextFormatting {iconSize} />
<TextFormattingHeader {iconSize} />
<TextFormattingAlign {iconSize} />
<TextFormattingIdent {iconSize} />
<MoreTools {iconSize} />
