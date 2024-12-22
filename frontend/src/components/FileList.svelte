<script lang="ts">
    import CardFileList from "./CardFileList.svelte";
</script>

<div class="file-list">
    <CardFileList/>
</div>

<style>
    .file-list {
        width: 100%;
        height: 100%;
        padding: var(--medium-small-margin);
        flex-grow: 1;
        overflow: auto;
        max-height: calc(100vh - var(--file-top-bar-height) - var(--file-bottom-bar-height));
    }
</style>
