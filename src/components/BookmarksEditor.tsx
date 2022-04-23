import React from 'react';
import styled from 'styled-components';
import JSONInput from 'react-json-editor-ajrm';

// @ts-ignore
import locale from 'react-json-editor-ajrm/locale/en';

const BigEditor = styled.div`

`;

interface Props {
    data: any;
    onChange?: (newData: any) => void;
    width?: string;
    height?: string;
}

export const BookmarksEditor: React.FunctionComponent<Props> = (props) => {

    const jsonChangeHandler = (jsonObj: any) => {
        console.log(`json changed`);
        try {
            if (jsonObj && props.onChange) {
                props.onChange(jsonObj.jsObject);
            }
        } catch (error) {
            console.error("Error when saving JSON");
        }
    };

    return (
        <BigEditor>
            <JSONInput
                    id          = 'a_unique_id'
                    height      = {props.height || '500px'}
                    width       = {props.width || '800px'}
                    theme       ='dark_vscode_tribute'
                    locale      = {locale}
                    placeholder = {props.data}
                    onChange    = {jsonChangeHandler}
                />
        </BigEditor>
    )
}