<script lang="ts">

import ActionBar from "./components/ActionBar.svelte";
</script>

<div class="left-bar flex flex-col items-center justify-between">
    <ActionBar/>
</div>

<style>
	.left-bar {
		width: 200px;
		height: 100%;
		background-color: #E4E4E4;
		--wails-draggable: drag;
	}
</style>
