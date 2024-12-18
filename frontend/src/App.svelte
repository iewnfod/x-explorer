<script lang="ts">
    import FilePart from "./FilePart.svelte";
    import LeftBar from "./LeftBar.svelte";
    import {separator, setPath} from "./data";
    import {SvelteUIProvider} from "@svelteuidev/core";
    import {GetCurrentPath, GetPathSeparator, OnAppReady} from "../wailsjs/go/main/App";

    OnAppReady().then(() => {
        GetCurrentPath().then((path) => {
            setPath(path);
        });
        GetPathSeparator().then((s) => {
            separator.set(s);
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
