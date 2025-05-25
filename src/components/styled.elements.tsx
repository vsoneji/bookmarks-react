import styled from "styled-components";
import { DraggingStyle, NotDraggingStyle } from "@hello-pangea/dnd";

// Define dark theme colors
const darkTheme = {
    background: '#121212',
    cardBackground: '#1e1e1e',
    cardHeaderBackground: '#353535', // New color for panel headers
    cardHover: '#2a2a2a',
    textPrimary: '#ffffff',
    textSecondary: '#b3b3b3',
    accent: '#3a8eff',
    border: '#333333',
    divider: '#333333'
};

export const BookmarksContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px; /* Reduced padding */
    background-color: ${darkTheme.background};
    height: 100vh; // Use exact viewport height instead of min-height
    overflow-y: overlay; // Changes to overlay which only shows scrollbar when needed
    overflow-x: hidden;
    box-sizing: border-box; // Include padding in height calculation
`;

export const BookmarksGrid = styled.div<{ $columns?: number }>`
    display: grid;
    grid-template-columns: repeat(${props => props.$columns || 5}, minmax(180px, 1fr));
    gap: 10px;
    width: 100%;
    max-width: ${props => `calc(180px * ${props.$columns || 5} + 10px * ${(props.$columns || 5) - 1})`};
    margin: 0;
    
    /* Basic panel container styling */
    & > * {
        min-width: 180px;
        height: fit-content;
    }
`;

// Panel component with standard background
export const BookmarkPanel = styled.div`
    background-color: ${darkTheme.cardBackground};
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    padding: 8px;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
    overflow: hidden;
    width: 100%;
    cursor: default;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 50px;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
        background-color: ${darkTheme.cardHover};
    }
`;

// Colorized panel heading
export const PanelHeading = styled.div<{ $bgColor?: string }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
    padding: 4px 6px;
    border-radius: 4px;
    background-color: ${props => props.$bgColor || darkTheme.cardHeaderBackground};
    color: ${props => {
        if (!props.$bgColor) return darkTheme.textPrimary;
        
        // Calculate brightness using relative luminance formula
        const hex = props.$bgColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16) / 255;
        const g = parseInt(hex.substr(2, 2), 16) / 255;
        const b = parseInt(hex.substr(4, 2), 16) / 255;
        
        // Calculate perceived brightness (weighted for human perception)
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
        
        // Use white text for dark backgrounds, black for light backgrounds
        return brightness > 0.5 ? '#000000' : '#ffffff';
    }};

    .panel-controls {
        display: flex;
        align-items: center;
        gap: 4px;
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    &:hover .panel-controls {
        opacity: 1;
    }
`;

export const ColorButton = styled.button`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid ${darkTheme.border};
    cursor: pointer;
    padding: 0;
    background-color: transparent;
    margin-left: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        transform: scale(1.2);
    }
    
    &:focus {
        outline: none;
    }
`;

export const BookmarkList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-height: 10px;
    margin-top: 4px;
`;

export const BookmarkItem = styled.div`
    display: flex;
    align-items: center;
    padding: 3px; /* Minimal padding */
    border-radius: 3px;
    transition: background-color 0.2s ease;
    cursor: grab;
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }
`;

export const BookmarkLink = styled.a`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${darkTheme.textSecondary};
    font-size: 12px; /* Smaller font */
    width: 100%;
    
    &:hover {
        color: ${darkTheme.accent};
    }
`;

export const DraggableItem = styled.div`
    /* Base styles for draggable items */
    user-select: none;
`;

export const SearchBar = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
    max-width: 600px;
    align-self: center;
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 6px 12px; /* Reduced padding */
    background-color: rgba(255, 255, 255, 0.05);
    color: ${darkTheme.textPrimary};
    border: 1px solid ${darkTheme.border};
    border-radius: 4px;
    font-size: 14px; /* Smaller font */
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    
    &:focus {
        border-color: ${darkTheme.accent};
        box-shadow: 0 0 0 2px rgba(58, 142, 255, 0.2);
    }
    
    &::placeholder {
        color: ${darkTheme.textSecondary};
    }
`;

// Dark-themed TextEditor
export const TextEditor = styled.textarea`
    width: 100%;
    height: 500px; /* Reduced height */
    font-family: monospace;
    padding: 8px;
    border-radius: 6px;
    background-color: #1a1a1a;
    color: #e0e0e0;
    border: 1px solid ${darkTheme.border};
    font-size: 13px; /* Smaller font size for editor */
`;

// Legacy components to avoid breaking existing code
// These can be removed once the refactoring is complete
export const BookmarkTable = styled.table`
    border-spacing: 20px;
    display: none; // Hide the table-based layout
`;

export const BookmarkRow = styled.tr`
    display: none; // Hide the table-based layout
`;

export const BookmarkCell = styled.td`
    display: none; // Hide the table-based layout
`;