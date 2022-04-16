import React, { useEffect, useState } from "react";
import { IBookmarkData } from "../model/schema";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { sampleData } from "../model/sampleData";
import { TextEditor } from "./styled.elements";

interface IFileEditorProps {
    data: IBookmarkData;
    onSave: (newData: IBookmarkData) => void;
    onCancel: () => void;
    show: boolean;
}

export const FileEditor: React.FunctionComponent<IFileEditorProps> = (props) => {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState(props.data);
    
    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newData = JSON.parse(event.target.value);
        setData(newData);
    }
    const handleSample = () => {
        setData(sampleData);
    }
    const handleOk = () => {
        props.onSave(data);
        setOpen(false);
    };
    const handleCancel = () => {
        props.onCancel();
        setOpen(false);
    };

    useEffect(() => setOpen(props.show), [props.show]);
    
    return (
        <Dialog open={open} onClose={handleCancel} maxWidth="lg" fullWidth={true}>
            <DialogTitle>Edit: {props.data.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edit the bookmarks in a panel and click save
                </DialogContentText>

                <TextEditor
                    value={JSON.stringify(data, null, 2)}
                    onChange={changeHandler}
                />
                <DialogActions>
                    <Button onClick={handleSample}>Load Sample Data</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleOk}>Save</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}