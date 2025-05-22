import { sampleData } from "../model/sampleData";
import { IBookmarkData } from "../model/schema";

// Helper to initialize sequence numbers based on array position
function initializeSequences(data: IBookmarkData): IBookmarkData {
    return {
        ...data,
        panels: data.panels.map((panel, index) => ({
            ...panel,
            sequence: panel.sequence ?? index
        }))
    };
}

export function saveToLocalStorage(data: IBookmarkData) {
    localStorage.setItem('bookmarks-data', JSON.stringify(data));
}

export function readFromLocalStorage(): IBookmarkData {
    const dataString = localStorage.getItem('bookmarks-data');
    if (dataString) {
        const data = JSON.parse(dataString) as IBookmarkData;
        // Initialize sequences for existing data if they don't exist
        return initializeSequences(data);
    }
    // Initialize sequences for sample data on first load
    const initialData = initializeSequences(sampleData);
    saveToLocalStorage(initialData);
    return initialData;
}