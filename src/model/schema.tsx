export interface IBookmark {
    url: string;
    label: string;
}

export interface IBookmarkPanel {
    label: string;
    ignored?: boolean;
    color?: string; // Added color property for customization
    sequence?: number; // Optional sequence number for panel ordering
    bookmarks: IBookmark[];
}

export interface IBookmarkData {
    title: string;
    columns?: number;  // Optional, defaults to 5 if not specified
    panels: IBookmarkPanel[];
}