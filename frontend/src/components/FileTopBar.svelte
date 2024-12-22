<script lang="ts">
    import {ActionIcon, Flex, Input, Text} from "@svelteuidev/core";
    import {ChevronLeft, ChevronRight, Heart, HeartFilled, MagnifyingGlass} from "radix-icons-svelte";
    import {
        currentTitle,
        goBackward,
        goForward,
        isBackwardAvailable, isCurrentFavorite,
        isForwardAvailable, toggleFavorite, searchText
    } from "../data";
    import {derived, get} from "svelte/store";

    const TOP_BAR_ICON_SIZE = 20;

    const backwardAvailable = derived(currentTitle, () => isBackwardAvailable());
    const forwardAvailable = derived(currentTitle, () => isForwardAvailable());
</script>

<div class="file-top-bar">
    <Flex
        direction="row"
        justify="space-between"
        align="center"
        style="height: var(--file-top-bar-height); margin-left: var(--medium-small-margin);"
    >
        <Flex direction="row" align="center">
            <ActionIcon
                disabled={!$forwardAvailable}
                on:click={() => goForward()}
                style="background-color: transparent"
            >
                <ChevronLeft size={TOP_BAR_ICON_SIZE}/>
            </ActionIcon>
            <ActionIcon
                disabled={!$backwardAvailable}
                on:click={() => goBackward()}
                style="background-color: transparent"
            >
                <ChevronRight size={TOP_BAR_ICON_SIZE}/>
            </ActionIcon>
            <Text weight="semibold" style="margin-left: var(--small-margin);" size="md">
                {$currentTitle}
            </Text>
        </Flex>
        <Flex direction="row" align="center" style="margin-right: var(--medium-small-margin); gap: var(--small-margin)">
            <ActionIcon on:click={() => toggleFavorite()}>
                {#if ($isCurrentFavorite)}
                    <HeartFilled size={TOP_BAR_ICON_SIZE} color="gray"/>
                {:else}
                    <Heart size={TOP_BAR_ICON_SIZE} color="gray"/>
                {/if}
            </ActionIcon>
            <Input
                icon={MagnifyingGlass}
                size="xs"
                radius="md"
                variant="unstyled"
                value={$searchText}
                on:input={(e) => searchText.set(e.target.value ?? get(searchText))}
                style="background-color: #FFFFFF; border-radius: var(--small-margin); padding-right: var(--smaller-margin)"
            />
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
