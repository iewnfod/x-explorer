<script lang="ts">
    import FilePart from "./FilePart.svelte";
    import LeftBar from "./LeftBar.svelte";
    import {separator, setPath} from "./data";
    import {Loader, SvelteUIProvider} from "@svelteuidev/core";
    import {GetCurrentPath, GetPathSeparator, OnAppReady} from "../wailsjs/go/main/App";
    import {writable} from "svelte/store";

    const isAppReady = writable(false);

    OnAppReady().then(() => {
        const promises = [];

        promises.push(
            GetCurrentPath().then((path) => {
                setPath(path);
            })
        );
        promises.push(
            GetPathSeparator().then((s) => {
                separator.set(s);
            })
        );

        Promise.all(promises).then(() => {
            isAppReady.set(true);
        });
    });
</script>

<main>
    <SvelteUIProvider>
        <div class="main-container">
            {#if $isAppReady}
                <LeftBar/>
                <FilePart/>
            {:else}
                <div class="load-container">
                    <Loader variant="bars"/>
                </div>
            {/if}
        </div>
    </SvelteUIProvider>
</main>

<style>
    .main-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        position: absolute;
        user-select: none;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0;
        margin: 0;
        overflow-x: hidden;
        overflow-y: hidden;
        background-color: #FFFFFF;
    }

    .load-container {
        --wails-draggable: drag;
        position: absolute;
        z-index: 1;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
