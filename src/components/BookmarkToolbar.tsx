import React, { useCallback } from "react";
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import BackIcon from '@mui/icons-material/ArrowBack'
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

export enum ToolbarMode {
    edit,
    view
}
interface Props {
    title: string;
    mode: ToolbarMode,
}

const EditDataIcon: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/edit', { replace: true}), [navigate]);
    return (
        <EditIcon onClick={handleOnClick}/>
    );
}

const BackViewIcon: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/', { replace: true}), [navigate]);
    return (
        <BackIcon onClick={handleOnClick}/>
    );
}

export const BookmarkToolbar: React.FunctionComponent<Props> = (props) => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    { props.mode === ToolbarMode.edit ? <BackViewIcon /> : <EditDataIcon />}
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}