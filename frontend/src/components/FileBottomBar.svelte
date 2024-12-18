<script lang="ts">
    import {ActionIcon, Breadcrumbs, Button, Flex} from '@svelteuidev/core';
    import {currentPath, separator, setPath} from "../data";
    import {get} from "svelte/store";
    import {DoubleArrowRight} from "radix-icons-svelte";

    function handleToPart(index: number) {
        let path = get(currentPath).slice(0, index+1);
        setPath(path.join(get(separator)));
    }
</script>

<div class="file-bottom-bar">
    <Flex direction="row" align="center" style="height: 100%; gap: var(--small-margin)">
        <ActionIcon
            size="xs"
            variant="transparent"
            style="transform: translateY(1px)"
            on:click={() => setPath('')}
        >
            <DoubleArrowRight/>
        </ActionIcon>

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
