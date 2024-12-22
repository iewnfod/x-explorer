import {separator} from "./data";
import {get} from "svelte/store";

export function getFinalPartOfPath(path: string) {
    const splitPath = path.split(get(separator));
    return splitPath[splitPath.length-1];
}
