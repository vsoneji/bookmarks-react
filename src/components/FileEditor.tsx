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
        try {
            const newData = JSON.parse(event.target.value);
            setData(newData);
        } catch (e) {
            // Ignore JSON parse errors during typing
        }
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
        <Dialog 
            open={open} 
            onClose={handleCancel} 
            maxWidth="lg" 
            fullWidth={true}
            PaperProps={{
                style: {
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px'
                }
            }}
        >
            <DialogTitle sx={{ 
                color: '#fff',
                padding: '12px 16px',
                fontSize: '18px'
            }}>
                Edit: {props.data.title}
            </DialogTitle>
            <DialogContent sx={{ padding: '0 16px 8px' }}>
                <DialogContentText sx={{ 
                    color: '#b3b3b3',
                    marginBottom: 1,
                    fontSize: '14px'
                }}>
                    Edit the bookmarks in a panel and click save
                </DialogContentText>

                <TextEditor
                    value={JSON.stringify(data, null, 2)}
                    onChange={changeHandler}
                />
                <DialogActions sx={{ padding: '8px 0 0', justifyContent: 'flex-end' }}>
                    <Button 
                        onClick={handleSample} 
                        variant="outlined" 
                        color="primary"
                        size="small"
                        sx={{ fontSize: '12px', padding: '4px 8px' }}
                    >
                        Load Sample
                    </Button>
                    <Button 
                        onClick={handleCancel}
                        variant="outlined"
                        size="small"
                        sx={{ fontSize: '12px', padding: '4px 8px' }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleOk} 
                        variant="contained" 
                        color="primary"
                        size="small"
                        sx={{ fontSize: '12px', padding: '4px 8px' }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}