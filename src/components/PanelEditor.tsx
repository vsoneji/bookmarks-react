import React, { useEffect } from "react";
import { IBookmarkPanel } from "../model/schema";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextEditor } from "./styled.elements";

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
    const [data, setData] = React.useState(props.panelData);

    const handleOk = () => {
        props.onSave(data);
        setOpen(false);
    };
    const handleCancel = () => {
        props.onCancel();
        setOpen(false);
    };

    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newData = JSON.parse(event.target.value);
        setData(newData);
    }

    useEffect(() => setOpen(props.show), [props.show]);

    return (
        <Dialog open={open} onClose={handleCancel} maxWidth="md" fullWidth={true}>
            <DialogTitle>Edit: {props.panelData.label}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edit the bookmarks in a panel and click save
                </DialogContentText>
                <TextEditor 
                    value={JSON.stringify(data, null, 2)}
                    onChange={changeHandler}
                />
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleOk}>Save</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};
