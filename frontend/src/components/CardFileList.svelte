<script lang="ts">
    import {currentFullPath, currentList, searchText, selectedList, separator, setPath} from "../data";
    import Folder from "../assets/folder.svg";
    import File from "../assets/file.svg";
    import type {filedata} from "../../wailsjs/go/models";
    import {derived, get} from "svelte/store";
    import {OpenFile} from "../../wailsjs/go/main/App";

    const showList = derived([currentList, searchText], ([currentList, searchText]) => {
        if (searchText === "") return currentList;

        const lowerText = searchText.toLowerCase();

        const returnList = [];
        currentList.forEach((item) => {
            if (item.Name.toLowerCase().includes(lowerText)) {
                returnList.push(item);
            }
        });
        return returnList;
    });

    function toPath(file: filedata.FileData) {
        const newPath = `${get(currentFullPath)}${get(separator)}${file.Name}`;
        if (file.IsDir) {
            setPath(newPath);
        } else {
            openFile(newPath)
        }
    }

    function openFile(p: string) {
        OpenFile(p);
    }

    function selectFile(file: filedata.FileData) {
        if (!get(selectedList).includes(file.Name)) {
            selectedList.update((l) => {
                l.push(file.Name);
                return l;
            });
        } else {
            selectedList.update((l) => {
                const index = l.indexOf(file.Name);
                l.splice(index, 1);
                return l;
            });
        }
    }
</script>

<div class="cards-container">
    {#each $showList as file, index}
        <button
            tabindex={index}
            class="card {$selectedList.includes(file.Name) ? 'selected-card' : ''}"
            on:dblclick={() => toPath(file)}
            on:click={() => selectFile(file)}
        >
            {#if file.IsDir}
                <img src={Folder} alt="" style="height: 50%">
                <div>
                    <span style="white-space: nowrap; text-overflow: ellipsis;">
                        {file.Name}
                    </span>
                </div>
            {:else}
                <img src={File} alt="" style="height: 50%">
                <div>
                    <span style="white-space: nowrap; text-overflow: ellipsis;">
                        {file.Name}
                    </span>
                </div>
            {/if}
        </button>
    {/each}
</div>

<style>
    .cards-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-flow: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        overflow: auto;
        gap: var(--medium-margin);
        padding-top: var(--smaller-margin);
    }

    .cards-container .card {
        width: calc(100% / 4);
    }

    .card {
        all: unset;
        margin: var(--smaller-smaller-margin) var(--smaller-margin);
        padding: var(--small-margin) var(--medium-margin);
        overflow: hidden;
        position: relative;
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: var(--small-margin);
        cursor: pointer;
        border-radius: var(--smaller-margin);
        box-shadow: 0 0 var(--smaller-margin) rgba(0, 0, 0, 0.25);
        background-color: transparent;
        transition: all .3s;
    }

    .card:hover {
        transform: translateY(calc(0px - var(--smaller-margin)));
    }

    .selected-card {
        background-color: green;
        color: #FFFFFF;
    }
</style>
