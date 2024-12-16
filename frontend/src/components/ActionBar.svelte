<script lang="ts">
    import {ActionIcon, Flex, Image} from "@svelteuidev/core";
    import {Cross2, Minus, EnterFullScreen} from "radix-icons-svelte";
    import {
        Quit,
        WindowMinimise,
        WindowToggleMaximise,
    } from "../../wailsjs/runtime";
    import {writable} from "svelte/store";
    import Close from "../assets/close.svg";
    import Minimize from "../assets/minimize.svg";
    import Maximize from "../assets/maximize.svg";

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

<Flex
    direction="row"
    style="gap: var(--small-margin); margin-left: var(--small-margin); padding-top: var(--small-margin)"
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
</Flex>
