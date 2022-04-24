import { IBookmarkPanel } from "../model/schema";
import { BookmarkPanel } from "./BookmarkPanel";
import styled from "styled-components";

const BookmarkRow = styled.tr`
    &:nth-child(odd) {
        > * {
            :nth-child(3n + 2) {
                background-color: rgb(200, 255, 255);
            }
            :nth-child(3n + 0) {
                background-color: rgb(255, 200, 255);
            }
            :nth-child(3n + 1) {
                background-color: white;
            }
        }
    }

    &:nth-child(even) {
        > * {
            :nth-child(3n + 1) {
                background-color: rgb(200, 255, 255);
            }
            :nth-child(3n + 2) {
                background-color: rgb(255, 200, 255);
            }
            :nth-child(3n + 0) {
                background-color: white;
            }
        }
    }
`;

interface IBookmarksRowProps {
    panels: IBookmarkPanel[];
}

export const BookmarksRow: React.FunctionComponent<IBookmarksRowProps> = (
    props
) => {
    return (
        <BookmarkRow>
            {props.panels.map((p, i) => {
                return <BookmarkPanel key={i} panel={p} />;
            })}
        </BookmarkRow>
    );
};
