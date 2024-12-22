<script lang="ts">
    import {Divider, Flex} from "@svelteuidev/core";
    import FileTopBar from "./components/FileTopBar.svelte";
    import FileList from "./components/FileList.svelte";
    import FileBottomBar from "./components/FileBottomBar.svelte";
</script>

<div class="file-part">
    <Flex direction="column" justify="space-between" style="height: 100%;">
        <FileTopBar/>
        <FileList/>
        <Divider orientation="horizontal" m={0}/>
        <FileBottomBar/>
    </Flex>
</div>

<style>
	.file-part {
		flex-grow: 1;
        width: var(--file-path-width);
		height: 100%;
	}
</style>
