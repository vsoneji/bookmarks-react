import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { BookmarksRow } from "./BookmarksRow";
import { sampleData } from "../model/sampleData";
import { IBookmarkData, IBookmarkPanel } from "../model/schema";
import { chunkArray } from "../utils/arrayUtils";
import { BookmarksEditor } from "./BookmarksEditor";
import { BookmarkToolbar, ToolbarMode } from "./BookmarkToolbar";
import styled from "styled-components";

const BookmarkTable = styled.table`
    border-spacing: 20px;
`;

export const App: React.FunctionComponent = () => {
    const [data, setData] = useState<IBookmarkData>(sampleData);
    const [rows, setRows] = useState<IBookmarkPanel[][]>([]);

    const jsonChangeHandler = (jsonObj: any) => {
        console.log(`json changed`);
        try {
            if (jsonObj) {
                setData(jsonObj.jsObject as IBookmarkData);
            }
        } catch (error) {
            console.error("Error when saving JSON");
        }
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
                                        <BookmarksRow key={i} panels={r} />
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
                            <BookmarksEditor
                                data={data}
                                onChange={jsonChangeHandler}
                            />
                        </>
                    }
                />
            </Routes>
        </>
    );
}
