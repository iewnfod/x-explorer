<script lang="ts">
    import {ActionIcon, Image} from "@svelteuidev/core";
    import {
        Quit,
        WindowMinimise,
        WindowToggleMaximise,
    } from "../../wailsjs/runtime";
    import {writable} from "svelte/store";
    import Close from "../assets/close.svg";
    import Minimize from "../assets/minimize.svg";
    import Maximize from "../assets/maximize.svg";

    export let style: string = undefined;

    const showCloseIcon = writable(false);
    const showMaximizeIcon = writable(false);
    const showMinimizeIcon = writable(false);

    function handleClose() {
        Quit();
    }

    function toggleMaximize() {
        WindowToggleMaximise();
    }

    function handleMinimize() {
        WindowMinimise();
    }
</script>

<div
    class="action-bar"
    style={style}
>
    <ActionIcon
        on:click={() => handleClose()}
        radius="xl" variant="filled"
        size={13} color="red"
        on:mouseenter={() => showCloseIcon.set(true)}
        on:mouseleave={() => showCloseIcon.set(false)}
    >
        {#if $showCloseIcon}
            <Image src={Close}/>
        {/if}
    </ActionIcon>
    <ActionIcon
            on:click={() => handleMinimize()}
            radius="xl" variant="filled"
            size={13} color="yellow"
            on:mouseenter={() => showMinimizeIcon.set(true)}
            on:mouseleave={() => showMinimizeIcon.set(false)}
    >
        {#if $showMinimizeIcon}
            <Image src={Minimize}/>
        {/if}
    </ActionIcon>
    <ActionIcon
            on:click={() => toggleMaximize()}
            radius="xl" variant="filled"
            size={13} color="green"
            on:mouseenter={() => showMaximizeIcon.set(true)}
            on:mouseleave={() => showMaximizeIcon.set(false)}
    >
        {#if $showMaximizeIcon}
            <Image src={Maximize}/>
        {/if}
    </ActionIcon>
</div>

<style>
    .action-bar {
        display: flex;
        flex-direction: row;
        gap: var(--small-margin);
    }
</style>
