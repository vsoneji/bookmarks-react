import React from 'react';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import { sampleData } from '../model/sampleData';
import styled from 'styled-components';

const BigEditor = styled.div`
    height: 800px;
`;

export const BookmarksEditor: React.FunctionComponent = () => {
    return (
        <BigEditor>
            <Editor 
                value={sampleData} 
                mode="code" 
                mainMenuBar={false}
            />
        </BigEditor>
    )
}