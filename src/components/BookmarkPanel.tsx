import React, { useState } from "react";
import styled from "styled-components";
import { IBookmarkPanel } from "../model/schema";
import { Bookmark } from "./Bookmark";
import { PanelEditor } from "./PanelEditor";

const Panel = styled.td`
    vertical-align: top;
    padding: 5px;
    border-style: solid;
    border-width: 2px;
    border-color: darkblue;
    border-radius: 5px;
    box-shadow: 5px 5px 3px grey;
    margin: 10px;
    color: black;
`;

const PanelHeading = styled.span`
    display: inline-block;
    font-size: 12pt;
    font-family: Arial;
    font-weight: bold;
    padding-bottom: 5px;
    padding-top: 5px;
`;

interface IBookmarkPanelProps {
    panel: IBookmarkPanel,
    onChange?: (orig: IBookmarkPanel, changed: IBookmarkPanel) => void,
}


export const BookmarkPanel: React.FunctionComponent<IBookmarkPanelProps> = (props) => {

    const [showEditor, setShowEditor] = useState<boolean>(false);
    const [panelData, setPanelData] = useState(props.panel)

    // eslint-disable-next-line
    const onEditorClick = () => {
        setShowEditor(true);
    };

    const onEditorSave = (newData: IBookmarkPanel) => {
        setShowEditor(false);
        console.log("Editor Save called");
        if (props.onChange) {
            props.onChange(panelData, newData);
        }
        setPanelData(newData);
    };

    const onEditorCancel = () => {
        setShowEditor(false);
        console.log("Editor Cancel called");
    };

    const onMouseDown: React.MouseEventHandler = (event) => {
        if (event.ctrlKey) {
            setShowEditor(true);
        }
    };

    return (
        <>
            <Panel onMouseDown={onMouseDown}>
                <PanelHeading>{panelData.label}</PanelHeading>
                {panelData.bookmarks.map((b, i) => {
                    return <Bookmark key={i} bookmark={b} />;
                })}
            </Panel>
            <PanelEditor
                panelData={panelData}
                onSave={onEditorSave}
                onCancel={onEditorCancel}
                show={showEditor}
            />
        </>
    );
};
