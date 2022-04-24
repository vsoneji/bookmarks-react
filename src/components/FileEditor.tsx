import React, { useEffect, useState } from "react";
import { IBookmarkData } from "../model/schema";
import { GenericEditor } from "./GenericEditor";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { sampleData } from "../model/sampleData";

interface IFileEditorProps {
    data: IBookmarkData;
    onSave: (newData: IBookmarkData) => void;
    onCancel: () => void;
    show: boolean;
}

export const FileEditor: React.FunctionComponent<IFileEditorProps> = (props) => {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState(props.data);
    
    const jsonChangeHandler = (newData: IBookmarkData) => {
        console.log(`json changed`);
        setData(newData);
    };

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
                <GenericEditor 
                    data={data} 
                    onChange={jsonChangeHandler}                         
                    width='100%'
                    height="600px"
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