import { sampleData } from "../model/sampleData";
import { IBookmarkData } from "../model/schema";

export function saveToLocalStorage(data: IBookmarkData) {
    localStorage.setItem('bookmarks-data', JSON.stringify(data));
}

export function readFromLocalStorage(): IBookmarkData {
    const dataString = localStorage.getItem('bookmarks-data');
    if (dataString) {
        return JSON.parse(dataString) as IBookmarkData
    }
    saveToLocalStorage(sampleData);
    return sampleData;
}