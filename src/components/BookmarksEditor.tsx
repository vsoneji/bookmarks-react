import React from 'react';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import './BookmarksEditor.css';
import { sampleData } from '../model/sampleData';

export const BookmarksEditor: React.FunctionComponent = () => {
    return (
        <div className="bigEditor">
            <Editor 
                value={sampleData} 
                mode="code" 
                mainMenuBar={false}
            />
        </div>
    )
}