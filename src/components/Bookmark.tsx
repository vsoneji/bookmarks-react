import React from "react";
import styled from "styled-components";
import { IBookmark } from "../model/schema";

export const BookmarkLink = styled.a`
    :link,
    :visited,
    :active {
        text-decoration: none;
        color: blue;
        white-space: nowrap;
        display: block;
        font-size: 12pt;
        margin-left: 5px;
    }
`;

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
