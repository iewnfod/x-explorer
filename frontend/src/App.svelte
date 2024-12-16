<script lang="ts">
    import FilePart from "./FilePart.svelte";
    import LeftBar from "./LeftBar.svelte";
    import {setPath} from "./data";
    import {SvelteUIProvider} from "@svelteuidev/core";
    import {GetCurrentPath, OnAppReady} from "../wailsjs/go/main/App";

    // start up actions
    OnAppReady().then(() => {
        GetCurrentPath().then((path) => {
            setPath(path);
        });
    });
</script>

<main>
    <SvelteUIProvider>
        <div class="main-container">
            <LeftBar/>
            <FilePart/>
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
</style>
