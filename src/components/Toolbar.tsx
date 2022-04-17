import React from "react";
import "./Toolbar.css";

interface Props {
    title: string;
}

export const Toolbar: React.FunctionComponent<Props> = (props) => {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    )
}