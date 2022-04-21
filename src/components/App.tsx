import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { BookmarksRow } from "./BookmarksRow";
import { sampleData } from "../model/sampleData";
import { IBookmarkData, IBookmarkPanel } from "../model/schema";
import { chunkArray } from "../utils/arrayUtils";
import { BookmarksEditor } from "./BookmarksEditor";
import { BookmarkToolbar } from "./BookmarkToolbar";
import styled from 'styled-components';

const BookmarkTable = styled.table`
    border-spacing: 20px;


`;

function App() {
    const [data] = useState<IBookmarkData>(sampleData);
    const [rows, setRows] = useState<IBookmarkPanel[][]>([]);

    useEffect(() => {
        const filteredPanels = data.panels.filter((p) => !p.ignored);
        const chunks: IBookmarkPanel[][] = chunkArray(
            filteredPanels,
            data.columns
        );
        setRows(chunks);
    }, [data]);

    return (
        <>
            <BookmarkToolbar title={data.title}/>
            <Routes>
                <Route path="/" element={
                    <BookmarkTable>
                        {rows.map((r, i) => (
                            <BookmarksRow key={i} panels={r} />
                        ))}
                    </BookmarkTable>
                } />
                <Route path="edit" element={<BookmarksEditor />} />
            </Routes>
        </>
    );
}

export default App;
