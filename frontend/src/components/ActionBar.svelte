<script lang="ts">
    import {ActionIcon, Flex} from "@svelteuidev/core";
    import {writable} from "svelte/store";
    import {Cross2, Minus, EnterFullScreen, ExitFullScreen} from "radix-icons-svelte";
    import {
        Quit,
        WindowIsMaximised, WindowMinimise,
        WindowToggleMaximise,
    } from "../../wailsjs/runtime";

    const isInFullscreen = writable(false);

    function handleClose() {
        Quit();
    }

    function handleMaximize() {
        WindowToggleMaximise();
        isInFullscreen.set(true);
    }

    function handleUnMaximize() {
        WindowToggleMaximise();
        isInFullscreen.set(false);
    }

    function handleMinimize() {
        WindowMinimise();
    }

    WindowIsMaximised().then((isFullscreen) => {
        isInFullscreen.set(isFullscreen);
    });
</script>

<Flex direction="row">
    <ActionIcon on:click={() => handleClose()}>
        <Cross2/>
    </ActionIcon>
    {#if isInFullscreen}
        <ActionIcon on:click={() => handleUnMaximize()} >
            <ExitFullScreen/>
        </ActionIcon>
    {:else}
        <ActionIcon on:click={() => handleMinimize()} >
            <EnterFullScreen/>
        </ActionIcon>
    {/if}
    <ActionIcon on:click={() => handleMinimize()} >
        <Minus/>
    </ActionIcon>
</Flex>
