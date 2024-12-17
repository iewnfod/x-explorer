import {persisted} from "svelte-persisted-store";
import type {filedata} from "../wailsjs/go/models";
type FileData = filedata.FileData;

export enum SortType {
    Default = "Default",
    A2Z = "A - Z",
    Z2A = "Z - A",
}

export interface Preferences {
    sortType: SortType,
    sortKey: keyof FileData
}

const DEFAULT_PREFERENCE: Preferences = {
    sortType: SortType.Default,
    sortKey: "Name"
}

export const preferences = persisted<Preferences>('preferences', DEFAULT_PREFERENCE);
