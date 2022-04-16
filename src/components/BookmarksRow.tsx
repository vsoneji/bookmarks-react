import { IBookmarkPanel } from "../model/schema";
import { BookmarkPanel } from "./BookmarkPanel";
import "./BookmarksRow.css";

export const BookmarksRow: React.FunctionComponent<{
    panels: IBookmarkPanel[];
}> = ({ panels }) => {
    return (
        <tr className="BookmarksRow">
            {panels.map((p) => {
                return <BookmarkPanel panel={p} />;
            })}
        </tr>
    );
};
