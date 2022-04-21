import React from "react";
import styled from "styled-components";
import { IBookmarkPanel } from "../model/schema";
import { Bookmark } from "./Bookmark";

const Panel = styled.td`
    vertical-align: top;
    padding: 5px;
    border-style: solid;
    border-width: 2px;
    border-color: darkblue;
    border-radius: 5px;
    box-shadow: 5px 5px 3px grey;
    margin: 10px;
    color: black
`;

const PanelHeading = styled.span`
    display: inline-block;
    font-size: 12.0pt;
    font-family: Arial;
    font-weight: bold;
    padding-bottom: 5px;
    padding-top: 5px;
`;

export const BookmarkPanel: React.FunctionComponent<{
    panel: IBookmarkPanel;
}> = ({ panel }) => {
    return (
        <Panel>
            <PanelHeading>{panel.label}</PanelHeading>
            {panel.bookmarks.map((b, i) => {
                return <Bookmark key={i} bookmark={b} />;
            })}
        </Panel>
    );
};
