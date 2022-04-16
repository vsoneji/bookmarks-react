import React, { useEffect, useState } from "react";
import { IBookmarkData, IBookmarkPanel } from "../model/schema";
import { chunkArray } from "../utils/arrayUtils";
import { BookmarkPanel } from "./BookmarkPanel";
import { BookmarkRow, BookmarkTable } from "./styled.elements";
import { readFromLocalStorage, saveToLocalStorage } from "../utils/dataUtils";
import { FileEditor } from "./FileEditor";
import EditIcon from '@mui/icons-material/Edit';
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";

export const App: React.FunctionComponent = () => {
    const [data, setData] = useState<IBookmarkData>(readFromLocalStorage());
    const [rows, setRows] = useState<IBookmarkPanel[][]>([]);
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

    useEffect(() => {
        document.title = data.title;
        const filteredPanels = data.panels.filter((p) => !p.ignored);
        const chunks: IBookmarkPanel[][] = chunkArray(
            filteredPanels,
            data.columns
        );
        setRows(chunks);
    }, [data]);

    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleEditIconClick}>
                        <EditIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        {data.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <BookmarkTable>
                <tbody>
                    {rows.map((r, i) => (
                        <BookmarkRow key={i}>
                            {r.map((p, k) => {
                                return (
                                    <BookmarkPanel
                                        key={k}
                                        panel={p}
                                        onChange={
                                            panelJsonChangeHandler
                                        }
                                    />
                                );
                            })}
                        </BookmarkRow>
                    ))}
                </tbody>
            </BookmarkTable>
            <FileEditor 
                data={data}
                onSave={onSaveHandler}
                show={showEditor}
                onCancel={onCancelHandler}
                />
        </>
    );
};
