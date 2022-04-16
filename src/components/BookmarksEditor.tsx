import React from 'react';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import './BookmarksEditor.css';
import { sampleData } from '../model/sampleData';

export const BookmarksEditor: React.FunctionComponent = () => {
    const editorProps = {
        height: "700px",
        width: "600px"
    }
    return (
        <div className="bigEditor">
            <Editor value={sampleData} mode="code" htmlElementProps={editorProps}/>
        </div>
    )
}