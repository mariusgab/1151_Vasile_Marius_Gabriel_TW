import React, { useEffect, useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import * as actions from "../redux/actions";

function PlaylistItemView(props) {
    const { playlist } = props;
    const dispatch = useDispatch();
    const { selectPlaylist, deletePlaylist, getSongs } = bindActionCreators(actions, dispatch);
    const state = useSelector((state) => state.data);

    return (
        <Box style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 0,
        }}>

            <ListItemButton onClick={() => {
                selectPlaylist(playlist);
                getSongs(playlist.id);
            }}>


                <ListItemText primary={<div>
                    <Typography sx={{ color: state.selectedPlaylist.id == playlist.id ? 'red' : 'black', fontWeight: 'bold', }}>
                        {playlist.descriere}
                    </Typography>
                </div>} style={{ margin: 8 }} />

            </ListItemButton>

            <IconButton aria-label="edit" onClick={() => {
                selectPlaylist(playlist);
                getSongs(playlist.id);

                props.openEditPlaylist()
            }}>
                <EditIcon />
            </IconButton>

            <IconButton aria-label="delete" onClick={() => {
                deletePlaylist(playlist.id)
            }}>
                <DeleteIcon />
            </IconButton>
        </Box>

    );
}

export default PlaylistItemView;