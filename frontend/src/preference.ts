import {persisted} from "svelte-persisted-store";
import type {filedata} from "../wailsjs/go/models";
import {get} from "svelte/store";
type FileData = filedata.FileData;

export enum SortType {
    Default = "Default",
    A2Z = "A - Z",
    Z2A = "Z - A",
}

export interface Preferences {
    sortType: SortType,
    sortKey: keyof FileData,
    favorites: string[]
}

const DEFAULT_PREFERENCE: Preferences = {
    sortType: SortType.Default,
    sortKey: "Name",
    favorites: []
}

export const preferences = persisted<Preferences>('preferences', DEFAULT_PREFERENCE);

export function addFavorite(path: string) {
    if (!isFavorite(path)) {
        preferences.update((prefer) => {
            prefer.favorites.push(path);
            return prefer;
        });
    }
}

export function removeFavorite(path: string) {
    if (isFavorite(path)) {
        preferences.update((prefer) => {
            const index = prefer.favorites.indexOf(path);
            prefer.favorites.splice(index, 1);
            return prefer;
        });
    }
}

export function isFavorite(path: string) {
    return get(preferences).favorites.includes(path);
}
