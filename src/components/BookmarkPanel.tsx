import React from "react";
import { IBookmarkPanel } from "../model/schema";
import "./BookmarkPanel.css";
function BookmarkPanel({ panelData }: { panelData: IBookmarkPanel }) {

  return (
    <td className="BookmarkPanel">

      <span className="PanelHeading">{panelData.label}</span>
      {
        panelData.bookmarks.map(b => {
          return (
            <a href={b.url}>{b.label}</a>
          )
        })
      }
    </td>
  );
}

export default BookmarkPanel;