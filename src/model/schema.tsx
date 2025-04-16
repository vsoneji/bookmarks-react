export interface IBookmark {
    url: string;
    label: string;
}

export interface IBookmarkPanel {
    label: string;
    ignored?: boolean;
    color?: string; // Added color property for customization
    bookmarks: IBookmark[];
}

export interface IBookmarkData {
    title: string;
    columns: number;
    panels: IBookmarkPanel[];
}