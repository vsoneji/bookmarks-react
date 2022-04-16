import React, { useEffect, useState } from "react";
import "./App.css";
import { BookmarksRow } from "./BookmarksRow";
import { sampleData } from "../model/sampleData";
import { IBookmarkData, IBookmarkPanel } from "../model/schema";
import { chunkArray } from "../utils/arrayUtils";

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
        <div className="App">
            <header>
                <h1>{data.title}</h1>
            </header>
            <table className="BookmarkTable">
                {rows.map((r) => (
                    <BookmarksRow panels={r} />
                ))}
            </table>
        </div>
    );
}

export default App;
