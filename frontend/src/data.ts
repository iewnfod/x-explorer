import {derived, get, writable} from "svelte/store";
import {GetFileList, GetSplitPath, SetCurrentPath} from "../wailsjs/go/main/App";
import type {pathobj} from "../wailsjs/go/models";

export const currentPath = writable<string[]>([]);

export const currentTitle = derived([currentPath], ([currentPath]) => {
    return currentPath[currentPath.length - 1] ?? "";
});

export const currentList = writable<pathobj.PathObj[]>([]);

const pathHistory = writable<string[]>([]);
const currentHistoryIndex = writable<number>(-1);

export function setPath(path: string, ignorePushHistory: boolean = false) {
    SetCurrentPath(path).then(() => {
        if (!ignorePushHistory) {
            currentHistoryIndex.set(get(pathHistory).length);
            pathHistory.update((history) => {
                history.push(path);
                return history;
            });
        }

        GetSplitPath().then((p) => {
            currentPath.set(p);
        });
        GetFileList().then((f) => {
            currentList.set(f);
        });
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
