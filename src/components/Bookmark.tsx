import React from "react";
import styled from "styled-components";
import { IBookmark } from "../model/schema";

export const BookmarkLink = styled.a`
    :link, :visited, :active {
        text-decoration: none;
        color: blue;
        white-space: nowrap;
        display: block;
        font-size: 12.0pt;
        margin-left: 5px;
    }
`

export const Bookmark: React.FunctionComponent<{ bookmark: IBookmark }> = ({
    bookmark,
}) => {
    return <BookmarkLink href={bookmark.url}>{bookmark.label}</BookmarkLink>;
};
