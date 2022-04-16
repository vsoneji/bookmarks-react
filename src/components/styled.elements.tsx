import styled from "styled-components";

export const BookmarkTable = styled.table`
    border-spacing: 20px;
`;

export const BookmarkRow = styled.tr`
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


export const BookmarkCell = styled.td`
    vertical-align: top;
    padding: 5px;
    border-style: solid;
    border-width: 2px;
    border-color: darkblue;
    border-radius: 5px;
    box-shadow: 5px 5px 3px grey;
    margin: 10px;
    color: black;
`;

export const PanelHeading = styled.span`
    display: inline-block;
    font-size: 12pt;
    font-family: Arial;
    font-weight: bold;
    padding-bottom: 5px;
    padding-top: 5px;
`;

export const BookmarkLink = styled.a`
    :link,
    :visited,
    :active {
        text-decoration: none;
        color: blue;
        white-space: nowrap;
        display: block;
        font-size: 12pt;
        margin-left: 5px;
    }
`;

export const TextEditor = styled.textarea`
    width: 100%;
    height: 600px;
`;