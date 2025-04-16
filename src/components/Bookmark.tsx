import React, { useState, useEffect } from "react";
import { IBookmark } from "../model/schema";
import { BookmarkLink, BookmarkIcon, BookmarkItem } from "./styled.elements";

interface IBookmarkProps {
    bookmark: IBookmark;
}

export const Bookmark: React.FunctionComponent<IBookmarkProps> = (props) => {
    const [faviconUrl, setFaviconUrl] = useState<string>("");
    
    useEffect(() => {
        try {
            // Extract domain for favicon
            const url = new URL(props.bookmark.url);
            const domain = url.hostname;
            // Set favicon URL from Google's favicon service
            setFaviconUrl(`https://www.google.com/s2/favicons?domain=${domain}&sz=32`);
        } catch (error) {
            // If URL is invalid, use a default icon
            setFaviconUrl("/favicon.ico");
        }
    }, [props.bookmark.url]);
    
    return (
        <BookmarkItem>
            <BookmarkLink href={props.bookmark.url} target="_blank" rel="noreferrer noopener">
                <BookmarkIcon src={faviconUrl} alt="" onError={(e) => (e.currentTarget.style.display = 'none')} />
                {props.bookmark.label}
            </BookmarkLink>
        </BookmarkItem>
    );
};
