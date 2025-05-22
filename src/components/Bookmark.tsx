import React from "react";
import { IBookmark } from "../model/schema";
import { BookmarkLink, BookmarkItem } from "./styled.elements";

interface IBookmarkProps {
    bookmark: IBookmark;
}

export const Bookmark: React.FunctionComponent<IBookmarkProps> = (props) => {
    return (
        <BookmarkItem>
            <BookmarkLink href={props.bookmark.url} target="_blank" rel="noreferrer noopener">
                {props.bookmark.label}
            </BookmarkLink>
        </BookmarkItem>
    );
};
