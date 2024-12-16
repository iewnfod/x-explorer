<script lang="ts">
    import {ActionIcon, Flex, Text} from "@svelteuidev/core";
    import {ChevronLeft, ChevronRight} from "radix-icons-svelte";
    import {currentTitle, goBackward, goForward, isBackwardAvailable, isForwardAvailable} from "../data";
    import {derived} from "svelte/store";

    const backwardAvailable = derived(currentTitle, () => isBackwardAvailable());
    const forwardAvailable = derived(currentTitle, () => isForwardAvailable());
</script>

<div class="file-top-bar">
    <Flex
        direction="row"
        justify="space-between"
        align="center"
        style="height: 100%; margin-left: var(--medium-margin);"
    >
        <Flex direction="row" align="center">
            <ActionIcon
                size="lg"
                disabled={!$backwardAvailable}
                on:click={() => goBackward()}
                style="background-color: transparent"
            >
                <ChevronLeft/>
            </ActionIcon>
            <ActionIcon
                size="lg"
                disabled={!$forwardAvailable}
                on:click={() => goForward()}
                style="background-color: transparent"
            >
                <ChevronRight/>
            </ActionIcon>
            <Text weight="semibold" style="margin-left: var(--small-margin);">
                {$currentTitle}
            </Text>
        </Flex>
    </Flex>
</div>

<style>
    .file-top-bar {
        width: 100%;
        height: 50px;
        background-color: rgb(242, 242, 242);
        --wails-draggable: drag;
    }
</style>
