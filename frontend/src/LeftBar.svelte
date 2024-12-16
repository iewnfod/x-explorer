<script lang="ts">
    import ActionBar from "./components/ActionBar.svelte";
</script>

<div class="left-bar flex flex-col items-center justify-between">
    <div class="left-bar-container">
        <ActionBar/>
    </div>
</div>

<style>
	.left-bar {
		width: 200px;
		height: 100%;
		background-color: #e4e4e4;
		--wails-draggable: drag;
	}
    .left-bar-container {
        margin: var(--small-margin);
        width: 100%;
        height: 100%;
    }
</style>
