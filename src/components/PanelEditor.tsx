import React, { useEffect } from "react";
import styled from "styled-components";
import { IBookmarkPanel } from "../model/schema";
import { Bookmark } from "./Bookmark";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IPanelEditorProps {
    panelData: IBookmarkPanel;
    onSave: (data: IBookmarkPanel) => void;
    onCancel: () => void;
    show: boolean;
}

export const PanelEditor: React.FunctionComponent<IPanelEditorProps> = (
    props
) => {
    const [open, setOpen] = React.useState(false);

    const handleOk = () => {
        props.onSave(props.panelData);
        setOpen(false);
    };
    const handleCancel = () => {
        props.onCancel();
        setOpen(false);
    };

    useEffect(() => setOpen(props.show), [props.show]);

    return (
        <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>Edit: {props.panelData.label}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edit the bookmarks in a panel and click save
                </DialogContentText>
                {props.panelData.bookmarks.map((b, i) => {
                    return <Bookmark key={i} bookmark={b} />;
                })}
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleOk}>Save</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};
