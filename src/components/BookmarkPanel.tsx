import React, { useState } from "react";
import { IBookmarkPanel } from "../model/schema";
import { Bookmark } from "./Bookmark";
import { EnhancedPanelEditor } from "./EnhancedPanelEditor";
import { BookmarkPanel as StyledPanel, PanelHeading, BookmarkList } from "./styled.elements";
import { IconButton } from "@mui/material";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// @ts-ignore - Ignoring type errors for react-beautiful-dnd
import { Droppable, Draggable } from "react-beautiful-dnd";

interface IBookmarkPanelProps {
    panel: IBookmarkPanel;
    onChange?: (orig: IBookmarkPanel, changed: IBookmarkPanel) => void;
    index: number; // Panel index for reference
    onMoveUp?: (index: number) => void;
    onMoveDown?: (index: number) => void;
}

export const BookmarkPanel: React.FunctionComponent<IBookmarkPanelProps> = (
    props
) => {
    const [showEditor, setShowEditor] = useState<boolean>(false);
    const [panelData, setPanelData] = useState(props.panel);

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

    return (
        <>            
            <StyledPanel>
                <PanelHeading $bgColor={panelData.color}>
                    <span>{panelData.label}</span>
                    <div className="panel-controls">
                        {props.onMoveUp && (
                            <IconButton 
                                size="small"
                                onClick={() => props.onMoveUp?.(props.index)}
                                sx={{ 
                                    padding: '1px',
                                    color: 'rgba(255,255,255,0.7)',
                                    '&:hover': {
                                        color: 'rgba(255,255,255,0.9)',
                                        backgroundColor: 'rgba(255,255,255,0.1)'
                                    }
                                }}
                            >
                                <ArrowUpwardIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                        )}
                        {props.onMoveDown && (
                            <IconButton 
                                size="small"
                                onClick={() => props.onMoveDown?.(props.index)}
                                sx={{ 
                                    padding: '1px',
                                    color: 'rgba(255,255,255,0.7)',
                                    '&:hover': {
                                        color: 'rgba(255,255,255,0.9)',
                                        backgroundColor: 'rgba(255,255,255,0.1)'
                                    }
                                }}
                            >
                                <ArrowDownwardIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                        )}
                        <IconButton 
                            size="small"
                            onClick={() => setShowEditor(true)}
                            sx={{ 
                                padding: '1px',
                                color: 'rgba(255,255,255,0.7)',
                                '&:hover': {
                                    color: 'rgba(255,255,255,0.9)',
                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            <ColorLensIcon sx={{ fontSize: '16px' }} />
                        </IconButton>
                    </div>
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
            
            <EnhancedPanelEditor
                panelData={panelData}
                show={showEditor}
                onSave={onEditorSave}
                onCancel={onEditorCancel}
            />
        </>
    );
};
