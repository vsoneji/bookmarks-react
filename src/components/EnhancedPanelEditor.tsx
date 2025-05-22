import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Grid
} from '@mui/material';
import { IBookmarkPanel, IBookmark } from '../model/schema';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Panel color options
const panelColors = [
    "#1e1e1e", // Default dark
    "#2c3e50", // Dark blue
    "#27ae60", // Green
    "#8e44ad", // Purple
    "#d35400", // Orange
    "#c0392b", // Red
    "#16a085", // Teal
    "#2980b9", // Blue
    "#f39c12", // Yellow
    "#34495e", // Navy
    "#a8d8ea", // Pastel blue
    "#aa96da", // Pastel purple
    "#fcbad3", // Pastel pink
    "#ffffd2", // Pastel yellow
    "#a2de96", // Pastel green
    "#ffcdb2", // Peach
    "#b5ead7", // Mint
    "#f6def6", // Lavender
    "#fdffb6", // Lemon
    "#caffbf"  // Light green
];

interface IEnhancedPanelEditorProps {
    panelData?: IBookmarkPanel; // Optional for new panel creation
    show: boolean;
    onSave: (data: IBookmarkPanel) => void;
    onCancel: () => void;
    isNew?: boolean;
}

export const EnhancedPanelEditor: React.FC<IEnhancedPanelEditorProps> = ({
    panelData,
    show,
    onSave,
    onCancel,
    isNew = false
}) => {
    const [label, setLabel] = useState(panelData?.label || '');
    const [color, setColor] = useState(panelData?.color || '#1e1e1e');
    const [bookmarks, setBookmarks] = useState<IBookmark[]>(panelData?.bookmarks || []);
    const [editingBookmark, setEditingBookmark] = useState<{ index: number; bookmark: IBookmark } | null>(null);
    const [newBookmarkUrl, setNewBookmarkUrl] = useState('');
    const [newBookmarkLabel, setNewBookmarkLabel] = useState('');

    useEffect(() => {
        if (show) {
            setLabel(panelData?.label || '');
            setColor(panelData?.color || '#1e1e1e');
            setBookmarks(panelData?.bookmarks || []);
        }
    }, [show, panelData]);

    const handleSave = () => {
        const updatedPanel: IBookmarkPanel = {
            label: label.trim(),
            color,
            bookmarks,
            ignored: panelData?.ignored
        };
        onSave(updatedPanel);
    };

    const handleAddBookmark = () => {
        if (newBookmarkUrl && newBookmarkLabel) {
            setBookmarks([...bookmarks, { url: newBookmarkUrl, label: newBookmarkLabel }]);
            setNewBookmarkUrl('');
            setNewBookmarkLabel('');
        }
    };

    const handleEditBookmark = (index: number) => {
        setEditingBookmark({ index, bookmark: bookmarks[index] });
    };

    const handleSaveBookmarkEdit = () => {
        if (editingBookmark) {
            const newBookmarks = [...bookmarks];
            newBookmarks[editingBookmark.index] = editingBookmark.bookmark;
            setBookmarks(newBookmarks);
            setEditingBookmark(null);
        }
    };

    const handleDeleteBookmark = (index: number) => {
        setBookmarks(bookmarks.filter((_, i) => i !== index));
    };

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(bookmarks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setBookmarks(items);
    };

    return (
        <Dialog
            open={show}
            onClose={onCancel}
            maxWidth="md"
            fullWidth
            PaperProps={{
                style: {
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px',
                    maxHeight: '90vh'
                }
            }}
        >
            <DialogTitle sx={{ 
                color: '#fff',
                p: 1.5,
                fontSize: '1rem'
            }}>
                {isNew ? 'Add New Panel' : `Edit Panel: ${panelData?.label}`}
            </DialogTitle>            <DialogContent sx={{ p: 1.5, pt: 2 }}>
                <Box>
                    {/* Panel Settings */}
                    <TextField
                        label="Panel Name"
                        fullWidth
                        size="small"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        sx={{
                            mb: 1.5,
                            '& .MuiInputLabel-root': { color: '#999' },
                            '& .MuiInputBase-root': { color: '#fff' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#333' },
                                '&:hover fieldset': { borderColor: '#666' },
                                '&.Mui-focused fieldset': { borderColor: '#3a8eff' }
                            }
                        }}
                    />

                    <Typography sx={{ color: '#999', mb: 0.5 }}>Panel Color</Typography>
                    <Grid container spacing={0.5} sx={{ mb: 2 }}>
                        {panelColors.map((c: string) => (
                            <Grid item key={c}>
                                <Box
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        backgroundColor: c,
                                        borderRadius: 1,
                                        cursor: 'pointer',
                                        border: c === color ? '2px solid white' : '1px solid #333',
                                        '&:hover': {
                                            opacity: 0.8,
                                            transform: 'scale(1.1)'
                                        },
                                        transition: 'transform 0.1s ease'
                                    }}
                                    onClick={() => setColor(c)}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Bookmarks List */}
                    <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                        Bookmarks
                    </Typography>

                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="bookmarks">
                            {(provided) => (
                                <List 
                                    {...provided.droppableProps} 
                                    ref={provided.innerRef}
                                    sx={{ 
                                        bgcolor: '#242424',
                                        borderRadius: 1,
                                        mb: 2
                                    }}
                                >
                                    {bookmarks.map((bookmark, index) => (
                                        <Draggable
                                            key={`${bookmark.url}-${index}`}
                                            draggableId={`${bookmark.url}-${index}`}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <ListItem
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    secondaryAction={
                                                        <>
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="edit"
                                                                onClick={() => handleEditBookmark(index)}
                                                                sx={{ color: '#666', mr: 1 }}
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="delete"
                                                                onClick={() => handleDeleteBookmark(index)}
                                                                sx={{ color: '#666' }}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </>
                                                    }
                                                    sx={{
                                                        borderBottom: '1px solid #333',
                                                        '&:last-child': { borderBottom: 'none' }
                                                    }}
                                                >
                                                    <div {...provided.dragHandleProps} style={{ marginRight: 8 }}>
                                                        <DragIndicatorIcon sx={{ color: '#666' }} />
                                                    </div>
                                                    <ListItemText
                                                        primary={bookmark.label}
                                                        secondary={bookmark.url}
                                                        sx={{
                                                            '& .MuiListItemText-primary': { color: '#fff' },
                                                            '& .MuiListItemText-secondary': { color: '#999' }
                                                        }}
                                                    />
                                                </ListItem>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </List>
                            )}
                        </Droppable>
                    </DragDropContext>

                    {/* Add New Bookmark Form */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ color: '#999', mb: 1 }}>
                            Add New Bookmark
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="URL"
                                    value={newBookmarkUrl}
                                    onChange={(e) => setNewBookmarkUrl(e.target.value)}
                                    sx={{
                                        '& .MuiInputLabel-root': { color: '#999' },
                                        '& .MuiInputBase-root': { color: '#fff' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: '#333' },
                                            '&:hover fieldset': { borderColor: '#666' },
                                            '&.Mui-focused fieldset': { borderColor: '#3a8eff' }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Label"
                                    value={newBookmarkLabel}
                                    onChange={(e) => setNewBookmarkLabel(e.target.value)}
                                    sx={{
                                        '& .MuiInputLabel-root': { color: '#999' },
                                        '& .MuiInputBase-root': { color: '#fff' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: '#333' },
                                            '&:hover fieldset': { borderColor: '#666' },
                                            '&.Mui-focused fieldset': { borderColor: '#3a8eff' }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="outlined"
                                    onClick={handleAddBookmark}
                                    disabled={!newBookmarkUrl || !newBookmarkLabel}
                                    sx={{
                                        color: '#fff',
                                        borderColor: '#666',
                                        '&:hover': { borderColor: '#fff' }
                                    }}
                                >
                                    Add Bookmark
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 1.5 }}>
                <Button onClick={onCancel} sx={{ color: '#999' }}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    size="small"
                    disabled={!label.trim()}
                    sx={{
                        bgcolor: '#3a8eff',
                        '&:hover': { bgcolor: '#1a6cd1' }
                    }}
                >
                    {isNew ? 'Create Panel' : 'Save Changes'}
                </Button>
            </DialogActions>

            {/* Edit Bookmark Dialog */}
            <Dialog
                open={!!editingBookmark}
                onClose={() => setEditingBookmark(null)}
                PaperProps={{
                    style: {
                        backgroundColor: '#1a1a1a',
                        borderRadius: '8px'
                    }
                }}
            >
                <DialogTitle sx={{ color: '#fff' }}>Edit Bookmark</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 1 }}>
                        <TextField
                            fullWidth
                            label="URL"
                            value={editingBookmark?.bookmark.url || ''}
                            onChange={(e) =>
                                setEditingBookmark(prev =>
                                    prev ? { ...prev, bookmark: { ...prev.bookmark, url: e.target.value } } : null
                                )
                            }
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Label"
                            value={editingBookmark?.bookmark.label || ''}
                            onChange={(e) =>
                                setEditingBookmark(prev =>
                                    prev ? { ...prev, bookmark: { ...prev.bookmark, label: e.target.value } } : null
                                )
                            }
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditingBookmark(null)} sx={{ color: '#999' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSaveBookmarkEdit} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Dialog>
    );
};
