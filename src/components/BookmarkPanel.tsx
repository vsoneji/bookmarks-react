import React, { useState, useRef } from "react";
import { IBookmarkPanel } from "../model/schema";
import { Bookmark } from "./Bookmark";
import { PanelEditor } from "./PanelEditor";
import { BookmarkPanel as StyledPanel, PanelHeading, BookmarkList, ColorButton } from "./styled.elements";
// @ts-ignore - Ignoring type errors for react-beautiful-dnd
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Popover, Box, Typography } from "@mui/material";
import PaletteIcon from '@mui/icons-material/Palette';

interface IBookmarkPanelProps {
    panel: IBookmarkPanel;
    onChange?: (orig: IBookmarkPanel, changed: IBookmarkPanel) => void;
    index: number; // Panel index for reference
}

// Expanded color palette including pastel colors
const panelColors = [
    // Dark colors
    "#1e1e1e", // Default dark
    "#2c3e50", // Dark blue
    "#27ae60", // Green
    "#8e44ad", // Purple
    "#d35400", // Orange
    
    // Medium colors
    "#c0392b", // Red
    "#16a085", // Teal
    "#2980b9", // Blue
    "#f39c12", // Yellow
    "#34495e", // Navy
    
    // Pastel colors
    "#a8d8ea", // Pastel blue
    "#aa96da", // Pastel purple
    "#fcbad3", // Pastel pink
    "#ffffd2", // Pastel yellow
    "#a2de96", // Pastel green
    
    // More pastel options
    "#ffcdb2", // Peach
    "#b5ead7", // Mint
    "#f6def6", // Lavender
    "#fdffb6", // Lemon
    "#caffbf"  // Light green
];

// Color category labels
const colorCategories = [
    { start: 0, label: "Dark" },
    { start: 5, label: "Medium" },
    { start: 10, label: "Pastel" },
    { start: 15, label: "Light Pastel" }
];

export const BookmarkPanel: React.FunctionComponent<IBookmarkPanelProps> = (
    props
) => {
    const [showEditor, setShowEditor] = useState<boolean>(false);
    const [panelData, setPanelData] = useState(props.panel);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const colorButtonRef = useRef<HTMLButtonElement>(null);

    const onEditorSave = (newData: IBookmarkPanel) => {
        setShowEditor(false);
        if (props.onChange) {
            props.onChange(panelData, newData);
        }
        setPanelData(newData);
    };

    const onEditorCancel = () => {
        setShowEditor(false);
    };

    const onPanelClick: React.MouseEventHandler = (event) => {
        if (event.altKey && event.ctrlKey) {
            setShowEditor(true);
        }
    };

    const handleColorButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Stop propagation to prevent panel click from triggering
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleColorSelect = (color: string) => {
        const updatedPanel = {
            ...panelData,
            color,
        };
        setPanelData(updatedPanel);
        if (props.onChange) {
            props.onChange(panelData, updatedPanel);
        }
        setAnchorEl(null);
    };

    const handleCloseColorPicker = () => {
        setAnchorEl(null);
    };

    const colorPickerOpen = Boolean(anchorEl);

    return (
        <>
            {/* Removed the Draggable wrapper since we're not allowing panel rearrangement */}
            <StyledPanel onClick={onPanelClick}>
                <PanelHeading $bgColor={panelData.color}>
                    <span>{panelData.label}</span>
                    <ColorButton 
                        ref={colorButtonRef}
                        onClick={handleColorButtonClick}
                        style={{ backgroundColor: panelData.color || '#1e1e1e' }}
                    >
                        <PaletteIcon style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }} />
                    </ColorButton>
                </PanelHeading>
                <Droppable droppableId={`bookmarks-${props.index}`} type="bookmark">
                    {(provided) => (
                        <BookmarkList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {panelData.bookmarks.map((bookmark, index) => (
                                <Draggable 
                                    key={`${bookmark.url}-${index}`} 
                                    draggableId={`${props.index}-bookmark-${index}`} 
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                ...provided.draggableProps.style,
                                                opacity: snapshot.isDragging ? 0.7 : 1,
                                                backgroundColor: snapshot.isDragging ? 'rgba(255, 255, 255, 0.1)' : undefined
                                            }}
                                        >
                                            <Bookmark bookmark={bookmark} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </BookmarkList>
                    )}
                </Droppable>
            </StyledPanel>

            {/* Color Picker Popover */}
            <Popover
                open={colorPickerOpen}
                anchorEl={anchorEl}
                onClose={handleCloseColorPicker}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ 
                    p: 1, 
                    bgcolor: '#1a1a1a',
                    borderRadius: '6px',
                    width: '230px'
                }}>
                    {colorCategories.map((category, catIndex) => (
                        <Box key={category.label} sx={{ mb: catIndex < colorCategories.length - 1 ? 1 : 0 }}>
                            <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 0.5, fontSize: '11px' }}>
                                {category.label}
                            </Typography>
                            <Box sx={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(5, 1fr)',
                                gap: '4px',
                                mb: 0.5
                            }}>
                                {panelColors.slice(category.start, category.start + 5).map((color) => (
                                    <Box
                                        key={color}
                                        sx={{
                                            width: '24px',
                                            height: '24px',
                                            bgcolor: color,
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            border: color === panelData.color ? '2px solid white' : '1px solid #333',
                                            '&:hover': {
                                                opacity: 0.8,
                                                transform: 'scale(1.1)',
                                            },
                                            transition: 'transform 0.1s ease',
                                        }}
                                        onClick={() => handleColorSelect(color)}
                                    />
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Popover>
            
            <PanelEditor
                panelData={panelData}
                onSave={onEditorSave}
                onCancel={onEditorCancel}
                show={showEditor}
            />
        </>
    );
};
