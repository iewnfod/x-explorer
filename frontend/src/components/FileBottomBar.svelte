<script lang="ts">
    import {Breadcrumbs, Button, Flex} from '@svelteuidev/core';
    import {currentPath, separator, setPath} from "../data";
    import {get} from "svelte/store";

    function handleToPart(index: number) {
        let path = get(currentPath).slice(0, index+1);
        setPath(path.join(get(separator)));
    }
</script>

<div class="file-bottom-bar">
    <Flex align="center" style="height: 100%;">
        <Breadcrumbs size="xs">
            {#each $currentPath as part, i}
                <Breadcrumbs.Item>
                    <Button
                        on:click={() => handleToPart(i)}
                        variant="white"
                        size="xs"
                        style="padding: 0; background-color: transparent"
                        color="gray"
                    >
                        {part}
                    </Button>
                </Breadcrumbs.Item>
            {/each}
        </Breadcrumbs>
    </Flex>
</div>

<style>
    .file-bottom-bar {
        width: 100%;
        padding-left: var(--small-margin);
        background-color: var(--file-bar-bg-color);
        height: var(--file-bottom-bar-height);
        padding-bottom: var(--smaller-margin);
    }
</style>
