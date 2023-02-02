<!--
Copyright: Ankitects Pty Ltd and contributors
License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html
-->
<script lang="ts">
    import { writable } from "svelte/store";
    import Row from "../components/Row.svelte";
    import TagEditor from "../tag-editor/TagEditor.svelte";
    import { tagsWritable } from "./store";

    export let globalTags: string[];

    const globalTagsWritable = writable<string[]>(globalTags);
</script>

<Row --cols={1}>
    <TagEditor
        tags={globalTagsWritable}
        on:tagsupdate={({ detail }) => {
            globalTags = detail.tags;
            tagsWritable.set(globalTags);
        }}
        keyCombination={"Control+T"}
    />
</Row>
