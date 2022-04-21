import React from 'react';
import { sampleData } from '../model/sampleData';
import styled from 'styled-components';
import JSONInput from 'react-json-editor-ajrm';

// @ts-ignore
import locale from 'react-json-editor-ajrm/locale/en';

const BigEditor = styled.div`

`;

export const BookmarksEditor: React.FunctionComponent = () => {

    return (
        <BigEditor>
            <JSONInput
                    id          = 'a_unique_id'
                    height      = '500px'
                    width       = '800px'
                    theme       ='dark_vscode_tribute'
                    locale      = {locale}
                    placeholder = {sampleData}
                />
        </BigEditor>
    )
}