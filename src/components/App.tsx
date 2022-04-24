import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { IBookmarkData, IBookmarkPanel } from "../model/schema";
import { chunkArray } from "../utils/arrayUtils";
import { GenericEditor } from "./GenericEditor";
import { BookmarkToolbar, ToolbarMode } from "./BookmarkToolbar";
import { BookmarkPanel } from "./BookmarkPanel";
import { BookmarkRow, BookmarkTable } from "./styled.elements";
import { readFromLocalStorage, saveToLocalStorage } from "../utils/dataUtils";

export const App: React.FunctionComponent = () => {
    const [data, setData] = useState<IBookmarkData>(readFromLocalStorage());
    const [rows, setRows] = useState<IBookmarkPanel[][]>([]);

    const jsonChangeHandler = (newData: IBookmarkData) => {
        console.log(`json changed`);
        setData(newData);
        saveToLocalStorage(newData);
    };

    const panelJsonChangeHandler = (orig: IBookmarkPanel, changed: IBookmarkPanel) => {
        console.log(`JSON changed for panel: ${orig.label}`);

        const newData: IBookmarkData = {
            title: data.title,
            columns: data.columns,
            panels: []
        };

        for (const p of data.panels) {
            newData.panels.push(p.label === orig.label ? changed : p);
        }
        setData(newData);
        saveToLocalStorage(newData);
    }

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
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <BookmarkToolbar
                                title={data.title}
                                mode={ToolbarMode.view}
                            />
                            <BookmarkTable>
                                <tbody>
                                    {rows.map((r, i) => (
                                        <BookmarkRow key={i} >
                                            {r.map((p, k) => {
                                                return (
                                                    <BookmarkPanel
                                                        key={k}
                                                        panel={p}
                                                        onChange={panelJsonChangeHandler}
                                                    />
                                                );
                                            })}
                                        </BookmarkRow>
                                    ))}
                                </tbody>
                            </BookmarkTable>
                        </>
                    }
                />
                <Route
                    path="edit"
                    element={
                        <>
                            <BookmarkToolbar
                                title={data.title}
                                mode={ToolbarMode.edit}
                            />
                            <GenericEditor
                                data={data}
                                onChange={jsonChangeHandler}
                            />
                        </>
                    }
                />
            </Routes>
        </>
    );
};
