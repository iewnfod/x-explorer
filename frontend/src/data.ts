import {derived, get, writable} from "svelte/store";
import {GetFileList, GetSplitPath, SetCurrentPath} from "../wailsjs/go/main/App";
import type {filedata} from "../wailsjs/go/models";
import {addFavorite, isFavorite, preferences, removeFavorite, SortType} from "./preference";
type FileData = filedata.FileData;

export const separator = writable('/');

export const currentPath = writable<string[]>([]);

export const currentFullPath = derived([separator, currentPath], ([separator, currentPath]) => {
    return currentPath.join(separator);
});

export const isCurrentFavorite = writable(isFavorite(get(currentFullPath)));

export const currentTitle = derived([currentPath], ([currentPath]) => {
    return currentPath[currentPath.length - 1] ?? "";
});

export const currentList = writable<FileData[]>([]);

const pathHistory = writable<string[]>([]);
const currentHistoryIndex = writable<number>(-1);

export function setPath(path: string, ignorePushHistory: boolean = false) {
    SetCurrentPath(path).then(() => {
        if (!ignorePushHistory) {
            if (path !== get(currentFullPath)) {
                currentHistoryIndex.set(get(pathHistory).length);
                pathHistory.update((history) => {
                    history.push(path);
                    return history;
                });
            }
        }

        GetSplitPath().then((p) => {
            currentPath.set(p);
        });

        refreshFileList();
    });
}

export function goBackward() {
    if (isBackwardAvailable()) {
        currentHistoryIndex.update((index) => index-1);
        setPath(get(pathHistory)[get(currentHistoryIndex)], true);
    }
}

export function goForward() {
    if (isForwardAvailable()) {
        currentHistoryIndex.update((index) => index+1);
        setPath(get(pathHistory)[get(currentHistoryIndex)], true);
    }
}

export function isBackwardAvailable() {
    return get(currentHistoryIndex) > 0;
}

export function isForwardAvailable() {
    return get(currentHistoryIndex) < get(pathHistory).length-1;
}

export function refreshFileList() {
    GetFileList().then((f) => {
        const prefer = get(preferences);
        switch (prefer.sortType) {
            case SortType.A2Z:
                f.sort((a, b) => a[prefer.sortKey] <= b[prefer.sortKey] ? -1 : 1)
                break;
            case SortType.Z2A:
                f.sort((a, b) => a[prefer.sortKey] >= b[prefer.sortKey] ? -1 : 1)
                break;
        }
        currentList.set(f);
    });
}

export function toggleFavorite() {
    const p = get(currentFullPath);
    if (get(isCurrentFavorite)) {
        removeFavorite(p);
    } else {
        addFavorite(p);
    }
    updateIsCurrentFavorite();
}

export function updateIsCurrentFavorite() {
    isCurrentFavorite.set(isFavorite(get(currentFullPath)));
}

currentFullPath.subscribe(() => {
    updateIsCurrentFavorite();
});
