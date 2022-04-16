import { IBookmarkPanel } from "../model/schema";
import BookmarkPanel from "./BookmarkPanel";
import "./BookmarksRow.css";

function BookmarksRow({panels}: { panels: IBookmarkPanel[]}) {
    return (
        <tr className="BookmarksRow">
        { 
          panels.map(p => {
            return (<BookmarkPanel panelData={p} />);
          })
        }
        </tr>
    )
}

export default BookmarksRow;