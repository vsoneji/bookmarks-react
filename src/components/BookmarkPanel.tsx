import React, { useState } from "react";
import { IBookmarkPanel } from "../model/schema";
import { Bookmark } from "./Bookmark";
import { PanelEditor } from "./PanelEditor";
import { BookmarkCell, PanelHeading } from "./styled.elements";

interface IBookmarkPanelProps {
    panel: IBookmarkPanel;
    onChange?: (orig: IBookmarkPanel, changed: IBookmarkPanel) => void;
}

export const BookmarkPanel: React.FunctionComponent<IBookmarkPanelProps> = (
    props
) => {
    const [showEditor, setShowEditor] = useState<boolean>(false);
    const [panelData, setPanelData] = useState(props.panel);

    const onEditorSave = (newData: IBookmarkPanel) => {
        setShowEditor(false);
        // console.log("Editor Save called");
        if (props.onChange) {
            props.onChange(panelData, newData);
        }
        setPanelData(newData);
    };

    const onEditorCancel = () => {
        setShowEditor(false);
        // console.log("Editor Cancel called");
    };

    const onMouseDown: React.MouseEventHandler = (event) => {
        if (event.altKey && event.ctrlKey) {
            setShowEditor(true);
        }
    };

    return (
        <>
            <BookmarkCell onMouseDown={onMouseDown}>
                <PanelHeading>{panelData.label}</PanelHeading>
                {panelData.bookmarks.map((b, i) => {
                    return <Bookmark key={i} bookmark={b} />;
                })}
            </BookmarkCell>
            <PanelEditor
                panelData={panelData}
                onSave={onEditorSave}
                onCancel={onEditorCancel}
                show={showEditor}
            />
        </>
    );
};
