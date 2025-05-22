import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { IBookmarkPanel } from '../model/schema';
import { EnhancedPanelEditor } from './EnhancedPanelEditor';

interface AddPanelButtonProps {
    onAdd: (panel: IBookmarkPanel) => void;
}

export const AddPanelButton: React.FC<AddPanelButtonProps> = ({ onAdd }) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = (newPanel: IBookmarkPanel) => {
        onAdd(newPanel);
        setOpen(false);
    };

    return (
        <>
            <IconButton
                color="inherit"
                aria-label="add panel"
                onClick={() => setOpen(true)}
                sx={{ 
                    padding: '4px',
                    '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                }}
            >
                <AddIcon fontSize="small" />
            </IconButton>

            <EnhancedPanelEditor
                show={open}
                onSave={handleSave}
                onCancel={handleClose}
                isNew
            />
        </>
    );
};
