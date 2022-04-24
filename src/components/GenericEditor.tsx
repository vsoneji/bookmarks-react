import React from "react";
import JSONInput from "react-json-editor-ajrm";

// @ts-ignore
import locale from "react-json-editor-ajrm/locale/en";

interface Props {
    data: any;
    onChange?: (newData: any) => void;
    width?: string;
    height?: string;
}

export const GenericEditor: React.FunctionComponent<Props> = (props) => {
    const jsonChangeHandler = (jsonObj: any) => {
        try {
            if (jsonObj && props.onChange) {
                props.onChange(jsonObj.jsObject);
            } else {
                console.log(`json changed`);
            }
        } catch (error) {
            console.error("Error when saving JSON");
        }
    };

    return (
        <JSONInput
            id="a_unique_id"
            height={props.height || "500px"}
            width={props.width || "800px"}
            theme="dark_vscode_tribute"
            locale={locale}
            placeholder={props.data}
            onChange={jsonChangeHandler}
        />
    );
};
