import React, { useEffect, useState } from "react";
import { IBookmarkData, IBookmarkPanel, IBookmark } from "../model/schema";
import { BookmarkPanel } from "./BookmarkPanel";
import { BookmarksContainer, BookmarksGrid } from "./styled.elements";
import { readFromLocalStorage, saveToLocalStorage } from "../utils/dataUtils";
import { FileEditor } from "./FileEditor";
import EditIcon from '@mui/icons-material/Edit';
import { AppBar, Toolbar, IconButton, Typography, createTheme, ThemeProvider } from "@mui/material";
// @ts-ignore - Ignoring type errors for react-beautiful-dnd
import { DragDropContext, DropResult } from "react-beautiful-dnd";

// Create dark theme for Material UI components
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3a8eff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

export const App: React.FunctionComponent = () => {
    const [data, setData] = useState<IBookmarkData>(readFromLocalStorage());
    const [filteredPanels, setFilteredPanels] = useState<IBookmarkPanel[]>([]);
    const [showEditor, setShowEditor] = useState<boolean>(false);

    const onSaveHandler = (newData: IBookmarkData) => {
        console.log(`json changed`);
        setData(newData);
        saveToLocalStorage(newData);
        setShowEditor(false);
    };

    const onCancelHandler = () => {
        setShowEditor(false);
    }

    const handleEditIconClick = () => {
        setShowEditor(true);
    }

    const panelJsonChangeHandler = (
        orig: IBookmarkPanel,
        changed: IBookmarkPanel
    ) => {
        console.log(`JSON changed for panel: ${orig.label}`);

        const newData: IBookmarkData = {
            title: data.title,
            columns: data.columns,
            panels: [],
        };

        for (const p of data.panels) {
            newData.panels.push(p.label === orig.label ? changed : p);
        }
        setData(newData);
        saveToLocalStorage(newData);
    };

    // Handle drag end events for bookmarks only
    const onDragEnd = (result: DropResult) => {
        const { source, destination, type } = result;

        // If dropped outside the list or no movement
        if (!destination || 
            (source.droppableId === destination.droppableId && 
             source.index === destination.index)) {
            return;
        }

        // Clone the current data to avoid mutating state directly
        const newData = {...data};
        
        // Handle dragging bookmarks within or between panels
        if (type === 'bookmark') {
            // Extract panel indices from the droppableId format "bookmarks-{index}"
            const sourcePanelIdx = parseInt(source.droppableId.split('-')[1]);
            const destPanelIdx = parseInt(destination.droppableId.split('-')[1]);
            
            // Use the filtered panels since those are the ones being displayed
            const sourcePanel = filteredPanels[sourcePanelIdx];
            const destPanel = filteredPanels[destPanelIdx];
            
            // Moving within the same panel
            if (sourcePanelIdx === destPanelIdx) {
                const newBookmarks = Array.from(sourcePanel.bookmarks);
                const [removed] = newBookmarks.splice(source.index, 1);
                newBookmarks.splice(destination.index, 0, removed);
                
                // Create an updated panel with the new bookmark order
                const updatedPanel: IBookmarkPanel = {
                    ...sourcePanel, 
                    bookmarks: newBookmarks
                };
                
                // Update the panel in the main data
                newData.panels = newData.panels.map(p => 
                    p.label === updatedPanel.label ? updatedPanel : p
                );
            } 
            // Moving between different panels
            else {
                // Remove from source panel
                const sourceBookmarks = Array.from(sourcePanel.bookmarks);
                const [bookmarkToMove] = sourceBookmarks.splice(source.index, 1);
                
                // Add to destination panel
                const destBookmarks = Array.from(destPanel.bookmarks);
                destBookmarks.splice(destination.index, 0, bookmarkToMove);
                
                // Create updated panels
                const updatedSourcePanel: IBookmarkPanel = {
                    ...sourcePanel,
                    bookmarks: sourceBookmarks
                };
                
                const updatedDestPanel: IBookmarkPanel = {
                    ...destPanel,
                    bookmarks: destBookmarks
                };
                
                // Update the panels in the main data
                newData.panels = newData.panels.map(p => {
                    if (p.label === updatedSourcePanel.label) return updatedSourcePanel;
                    if (p.label === updatedDestPanel.label) return updatedDestPanel;
                    return p;
                });
            }
            
            setData(newData);
            saveToLocalStorage(newData);
        }
    };

    // Get panels to display (all non-ignored panels)
    useEffect(() => {
        document.title = data.title;
        // Show all non-ignored panels
        setFilteredPanels(data.panels.filter(p => !p.ignored));
    }, [data]);

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position="static" color="primary" elevation={2}>
                <Toolbar variant="dense" sx={{ minHeight: '48px', py: 0 }}>
                    <IconButton 
                        edge="start" 
                        color="inherit" 
                        aria-label="menu" 
                        sx={{ mr: 1, padding: '4px' }} 
                        onClick={handleEditIconClick}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <Typography 
                        variant="subtitle1" 
                        color="inherit" 
                        component="div" 
                        sx={{ flexGrow: 1, fontSize: '15px' }}
                    >
                        {data.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            
            <DragDropContext onDragEnd={onDragEnd}>                <BookmarksContainer>
                    {/* Removed the Droppable wrapper for panels since we're not allowing panel rearrangement */}
                    <BookmarksGrid $columns={data.columns}>
                        {filteredPanels.map((panel, index) => (
                            <BookmarkPanel
                                key={`${panel.label}-${index}`}
                                panel={panel}
                                index={index}
                                onChange={panelJsonChangeHandler}
                            />
                        ))}
                    </BookmarksGrid>
                </BookmarksContainer>
            </DragDropContext>
            
            <FileEditor 
                data={data}
                onSave={onSaveHandler}
                show={showEditor}
                onCancel={onCancelHandler}
            />
        </ThemeProvider>
    );
};
