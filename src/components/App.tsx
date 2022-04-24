import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { sampleData } from "../model/sampleData";
import { IBookmarkData, IBookmarkPanel } from "../model/schema";
import { chunkArray } from "../utils/arrayUtils";
import { GenericEditor } from "./GenericEditor";
import { BookmarkToolbar, ToolbarMode } from "./BookmarkToolbar";
import styled from "styled-components";
import { BookmarkPanel } from "./BookmarkPanel";

const BookmarkTable = styled.table`
    border-spacing: 20px;
`;

const BookmarkRow = styled.tr`
    &:nth-child(odd) {
        > * {
            :nth-child(3n + 2) {
                background-color: rgb(200, 255, 255);
            }
            :nth-child(3n + 0) {
                background-color: rgb(255, 200, 255);
            }
            :nth-child(3n + 1) {
                background-color: white;
            }
        }
    }

    &:nth-child(even) {
        > * {
            :nth-child(3n + 1) {
                background-color: rgb(200, 255, 255);
            }
            :nth-child(3n + 2) {
                background-color: rgb(255, 200, 255);
            }
            :nth-child(3n + 0) {
                background-color: white;
            }
        }
    }
`;

export const App: React.FunctionComponent = () => {
    const [data, setData] = useState<IBookmarkData>(sampleData);
    const [rows, setRows] = useState<IBookmarkPanel[][]>([]);

    const jsonChangeHandler = (newData: IBookmarkData) => {
        console.log(`json changed`);
        setData(newData);
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
                                        <BookmarkRow key={i} >
                                            {r.map((p, k) => {
                                                return (
                                                    <BookmarkPanel
                                                        key={k}
                                                        panel={p}
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
