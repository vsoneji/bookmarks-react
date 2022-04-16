import React from "react";
import { IBookmark } from "../model/schema";
import "./Bookmark.css";

export const Bookmark: React.FunctionComponent<{ bookmark: IBookmark }> = ({
    bookmark,
}) => {
    return <a href={bookmark.url}>{bookmark.label}</a>;
};
