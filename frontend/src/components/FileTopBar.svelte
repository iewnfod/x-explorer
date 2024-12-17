<script lang="ts">
    import {ActionIcon, Flex, Text} from "@svelteuidev/core";
    import {ChevronLeft, ChevronRight} from "radix-icons-svelte";
    import {currentTitle, goBackward, goForward, isBackwardAvailable, isForwardAvailable} from "../data";
    import {derived} from "svelte/store";

    const TOP_BAR_ICON_SIZE = 20;

    const backwardAvailable = derived(currentTitle, () => isBackwardAvailable());
    const forwardAvailable = derived(currentTitle, () => isForwardAvailable());
</script>

<div class="file-top-bar">
    <Flex
        direction="row"
        justify="space-between"
        align="center"
        style="height: var(--file-top-bar-height); margin-left: var(--medium-margin);"
    >
        <Flex direction="row" align="center">
            <ActionIcon
                size="lg"
                disabled={!$forwardAvailable}
                on:click={() => goForward()}
                style="background-color: transparent"
            >
                <ChevronLeft size={TOP_BAR_ICON_SIZE}/>
            </ActionIcon>
            <ActionIcon
                size="lg"
                disabled={!$backwardAvailable}
                on:click={() => goBackward()}
                style="background-color: transparent"
            >
                <ChevronRight size={TOP_BAR_ICON_SIZE}/>
            </ActionIcon>
            <Text weight="semibold" style="margin-left: var(--small-margin);" size="lg">
                {$currentTitle}
            </Text>
        </Flex>
    </Flex>
</div>

<style>
    .file-top-bar {
        width: 100%;
        background-color: var(--file-bar-bg-color);
        --wails-draggable: drag;
    }
</style>
