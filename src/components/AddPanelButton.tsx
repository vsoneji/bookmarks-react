import React, { useState } from 'react';
import { Button } from '@mui/material';
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
            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
                sx={{
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.3)',
                    '&:hover': {
                        borderColor: 'rgba(255,255,255,0.8)',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                }}
            >
                Add Panel
            </Button>

            <EnhancedPanelEditor
                show={open}
                onSave={handleSave}
                onCancel={handleClose}
                isNew
            />
        </>
    );
};
