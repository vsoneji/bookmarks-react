import React, { useState } from 'react';
import { sampleData } from '../model/sampleData';
import styled from 'styled-components';
import JSONInput from 'react-json-editor-ajrm';

// @ts-ignore
import locale from 'react-json-editor-ajrm/locale/en';
import { IBookmarkData } from '../model/schema';
import { PropaneSharp } from '@mui/icons-material';

const BigEditor = styled.div`

`;

interface Props {
    data: IBookmarkData,
    onChange?: (newData: IBookmarkData) => void
}

export const BookmarksEditor: React.FunctionComponent<Props> = (props) => {
    return (
        <BigEditor>
            <JSONInput
                    id          = 'a_unique_id'
                    height      = '500px'
                    width       = '800px'
                    theme       ='dark_vscode_tribute'
                    locale      = {locale}
                    placeholder = {props.data}
                    onChange    = {props.onChange}
                />
        </BigEditor>
    )
}