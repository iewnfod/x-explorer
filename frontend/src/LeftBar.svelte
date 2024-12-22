<script lang="ts">
    import ActionBar from "./components/ActionBar.svelte";
    import FavoriteList from "./components/FavoriteList.svelte";
    import {Flex} from "@svelteuidev/core";
</script>

<div class="left-bar">
    <Flex direction="column" style="width: 100%; gap: var(--medium-margin)">
        <ActionBar style="margin-left: var(--medium-medium-large-margin); margin-top: var(--medium-medium-large-margin)"/>
        <FavoriteList/>
    </Flex>
</div>

<style>
	.left-bar {
		width: var(--left-part-width);
		height: 100%;
		background-color: #e4e4e4;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
		--wails-draggable: drag;
	}
</style>
