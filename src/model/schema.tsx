export interface IBookmark {
    url: string;
    label: string;
}

export interface IBookmarkPanel {
    label: string;
    ignored?: boolean;
    bookmarks: IBookmark[];
}

export interface IBookmarkData {
    title: string;
    columns: number;
    panels: IBookmarkPanel[];
}