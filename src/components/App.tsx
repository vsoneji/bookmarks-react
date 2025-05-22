import React, { useEffect, useState } from "react";
import { IBookmarkData, IBookmarkPanel } from "../model/schema";
import { BookmarkPanel } from "./BookmarkPanel";
import { BookmarksContainer, BookmarksGrid } from "./styled.elements";
import { readFromLocalStorage, saveToLocalStorage } from "../utils/dataUtils";
import { FileEditor } from "./FileEditor";
import { AddPanelButton } from "./AddPanelButton";
import SettingsIcon from '@mui/icons-material/Settings';
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

// Helper function to sort panels by sequence and physical order
const sortPanels = (panels: IBookmarkPanel[]) => {
    return [...panels].sort((a, b) => {
        // If both panels have sequence numbers, use them
        if (a.sequence !== undefined && b.sequence !== undefined) {
            if (a.sequence !== b.sequence) {
                return a.sequence - b.sequence;
            }
        }
        // If only one panel has a sequence number, prioritize it
        else if (a.sequence !== undefined) {
            return -1;
        }
        else if (b.sequence !== undefined) {
            return 1;
        }
        // Otherwise maintain physical order by using indexOf
        return panels.indexOf(a) - panels.indexOf(b);
    });
};

export const App: React.FunctionComponent = () => {
    const [data, setData] = useState<IBookmarkData>(readFromLocalStorage());
    const [showEditor, setShowEditor] = useState<boolean>(false);
    const [updateKey, setUpdateKey] = useState(0); // Add this to force re-render when needed

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

    const handleAddPanel = (newPanel: IBookmarkPanel) => {
        const newData: IBookmarkData = {
            ...data,
            panels: [...data.panels, newPanel]
        };
        setData(newData);
        saveToLocalStorage(newData);
    };

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

        // Handle dragging bookmarks within or between panels
        if (type === 'bookmark') {
            const newData = {...data};
            // Extract panel indices from the droppableId format "bookmarks-{index}"
            const sourcePanelIdx = parseInt(source.droppableId.split('-')[1]);
            const destPanelIdx = parseInt(destination.droppableId.split('-')[1]);

            // Get visible panels (non-ignored)
            const visiblePanels = data.panels.filter(p => !p.ignored);
            
            // Find source and destination panels using the original unfiltered data
            const sourcePanelIndex = data.panels.findIndex(p => p.label === visiblePanels[sourcePanelIdx].label);
            const destPanelIndex = data.panels.findIndex(p => p.label === visiblePanels[destPanelIdx].label);
            
            const sourcePanel = data.panels[sourcePanelIndex];
            const destPanel = data.panels[destPanelIndex];
            
            // Moving within the same panel
            if (sourcePanelIndex === destPanelIndex) {
                const newBookmarks = Array.from(sourcePanel.bookmarks);
                const [removed] = newBookmarks.splice(source.index, 1);
                newBookmarks.splice(destination.index, 0, removed);
                
                // Create an updated panel with the new bookmark order
                const updatedPanel: IBookmarkPanel = {
                    ...sourcePanel, 
                    bookmarks: newBookmarks
                };
                
                // Update the panel in the main data
                newData.panels = data.panels.map((p, i) => 
                    i === sourcePanelIndex ? updatedPanel : p
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
                
                // Update both panels in the main data
                newData.panels = data.panels.map((p, i) => {
                    if (i === sourcePanelIndex) return updatedSourcePanel;
                    if (i === destPanelIndex) return updatedDestPanel;
                    return p;
                });
            }
            
            // Update the data and force a re-render
            setData(newData);
            saveToLocalStorage(newData);
            setUpdateKey(prev => prev + 1);
        }
    };

    useEffect(() => {
        document.title = data.title;
    }, [data.title]);

    // Get non-ignored panels and sort them by sequence
    const visiblePanels = sortPanels(data.panels.filter(p => !p.ignored));

    const handleMovePanel = (index: number, direction: 'up' | 'down') => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= visiblePanels.length) return;

        const panel = visiblePanels[index];
        const targetPanel = visiblePanels[newIndex];
        
        // Swap sequence numbers if they exist, otherwise create new ones
        let newSequence = panel.sequence ?? visiblePanels.length;
        let targetSequence = targetPanel.sequence ?? (direction === 'up' ? newSequence - 1 : newSequence + 1);
        
        // Create updated panels with swapped sequence numbers
        const updatedPanels = data.panels.map(p => {
            if (p.label === panel.label) {
                return { ...p, sequence: targetSequence };
            }
            if (p.label === targetPanel.label) {
                return { ...p, sequence: newSequence };
            }
            return p;
        });

        const newData = {
            ...data,
            panels: updatedPanels
        };

        setData(newData);
        saveToLocalStorage(newData);
        setUpdateKey(prev => prev + 1);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position="static" color="primary" elevation={2}>
                <Toolbar variant="dense" sx={{ minHeight: '48px', py: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                            color="inherit" 
                            aria-label="settings" 
                            sx={{ padding: '4px' }} 
                            onClick={handleEditIconClick}
                        >
                            <SettingsIcon fontSize="small" />
                        </IconButton>
                        <AddPanelButton onAdd={handleAddPanel} />
                    </div>
                    <Typography 
                        variant="subtitle1" 
                        color="inherit" 
                        component="div" 
                        sx={{ flexGrow: 1, fontSize: '15px', ml: 1 }}
                    >
                        {data.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <DragDropContext onDragEnd={onDragEnd}>                
                <BookmarksContainer>
                    <BookmarksGrid $columns={data.columns}>
                        {visiblePanels.map((panel: IBookmarkPanel, index: number) => (
                            <BookmarkPanel
                                key={`${panel.label}-${index}-${updateKey}`}
                                panel={panel}
                                index={index}
                                onChange={panelJsonChangeHandler}
                                onMoveUp={index > 0 ? (idx) => handleMovePanel(idx, 'up') : undefined}
                                onMoveDown={index < visiblePanels.length - 1 ? (idx) => handleMovePanel(idx, 'down') : undefined}
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
