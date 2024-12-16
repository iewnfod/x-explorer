<script lang="ts">
    import {currentPath} from "./data";
</script>

<div class="file-part">
    <h3>{$currentPath}</h3>
</div>

<style>
	.file-part {
		flex-grow: 1;
		height: 100%;
        margin: 1rem;
	}
</style>
