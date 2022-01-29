import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from "../redux/actions";
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import AddPlaylistView from './AddPlaylist';
import AddSongView from './AddSong';

function MainView() {
    const dispatch = useDispatch();
    const { getPlaylists } = bindActionCreators(actions, dispatch);
    const state = useSelector((state) => state.data);

    const [openAddPlaylistView, setOpenAddPlaylistView] = useState(false);
    const [openAddSongView, setOpenAddSongView] = useState(false);

    useEffect(() => {
        getPlaylists();
    }, []);

    return (
        <Box id="main_view_container">
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Typography fontWeight="bold" fontSize="30px" padding="16px">Playlists</Typography>
                    <List>
                        <Button variant="text" onClick={() => {
                            setOpenAddPlaylistView(true);
                        }}>
                            <Typography fontWeight="bold" fontSize="15px" padding="8px">+ Add new playlist</Typography>
                        </Button>

                        {state.playlists && state.playlists.map(playlist =>
                            <ListItem>
                                <Typography>{playlist.descriere}</Typography>
                            </ListItem>
                        )}
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <Typography fontWeight="bold" fontSize="30px" padding="16px">Songs</Typography>
                    <List>
                        <Button variant="text" onClick={() => {
                            setOpenAddSongView(true);
                        }}>
                            <Typography fontWeight="bold" fontSize="15px" padding="8px">+ Add new song</Typography>
                        </Button>

                        {state.songs && state.songs.map(song =>
                            <ListItem>
                                <Typography>{song.titlu}</Typography>
                                <Typography>{song.url}</Typography>
                                <Typography>{song.stil}</Typography>
                            </ListItem>
                        )}
                    </List>
                </Grid>
            </Grid>

            {openAddPlaylistView &&
                <AddPlaylistView
                    open={openAddPlaylistView}
                    onClick={() => {
                        setOpenAddPlaylistView(true);
                    }}
                    handleClose={() => setOpenAddPlaylistView(false)}
                />
            }

            {openAddSongView &&
                <AddSongView
                    open={openAddSongView}
                    onClick={() => {
                        setOpenAddSongView(true);
                    }}
                    playlistId={state.selectedPlaylist.id}
                    handleClose={() => setOpenAddSongView(false)}
                />
            }
        </Box>

    );
}

export default MainView;
