import React from "react";
import { IBookmark } from "../model/schema";
import { BookmarkLink } from "./styled.elements";

interface IBookmarkProps {
    bookmark: IBookmark;
}

export const Bookmark: React.FunctionComponent<IBookmarkProps> = (props) => {
    return (
        <BookmarkLink href={props.bookmark.url}>
            {props.bookmark.label}
        </BookmarkLink>
    );
};
