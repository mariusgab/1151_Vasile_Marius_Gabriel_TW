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
import PlaylistItemView from './PlayListItem';
import SongItemView from './SongItem';

function MainView() {
    const dispatch = useDispatch();
    const { getPlaylists, selectPlaylist } = bindActionCreators(actions, dispatch);
    const state = useSelector((state) => state.data);

    const [openAddPlaylistView, setOpenAddPlaylistView] = useState(false);
    const [openAddSongView, setOpenAddSongView] = useState(false);

    useEffect(async () => {
        getPlaylists(true);
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
                            <PlaylistItemView key={playlist.id} playlist={playlist} openEditPlaylist={() => {

                            }} />
                        )}
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <Typography fontWeight="bold" fontSize="30px" padding="16px">Songs</Typography>
                    <List>
                        <Button variant="text" onClick={() => {
                            if (state.selectedPlaylist != null) {
                                setOpenAddSongView(true);
                            }
                            else {
                                alert("No playlist selected!")
                            }
                        }}>
                            <Typography fontWeight="bold" fontSize="15px" padding="8px">+ Add new song</Typography>
                        </Button>

                        {state.selectedPlaylist && state.selectedPlaylist.songs && state.selectedPlaylist.songs.map(song =>
                            <SongItemView key={song.id} song={song} openEditSong={() => {

                            }} />
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
