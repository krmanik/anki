<!--
Copyright: Ankitects Pty Ltd and contributors
License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html
-->
<script lang="ts">
    import DeckOptionsPage from "../DeckOptionsPage.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<DeckOptionsPage state={data.state} />
