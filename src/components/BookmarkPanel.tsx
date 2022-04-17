import React from "react";
import { IBookmarkPanel } from "../model/schema";
import { Bookmark } from "./Bookmark";
import "./BookmarkPanel.css";

export const BookmarkPanel: React.FunctionComponent<{
    panel: IBookmarkPanel;
}> = ({ panel }) => {
    return (
        <td className="BookmarkPanel">
            <span className="PanelHeading">{panel.label}</span>
            {panel.bookmarks.map((b, i) => {
                return <Bookmark key={i} bookmark={b} />;
            })}
        </td>
    );
};
