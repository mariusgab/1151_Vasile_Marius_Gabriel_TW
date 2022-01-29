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
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import Stack from '@mui/material/Stack';

function MainView() {
    const dispatch = useDispatch();
    const { getPlaylists, selectPlaylist, getSongs, sortPlaylists } = bindActionCreators(actions, dispatch);
    const state = useSelector((state) => state.data);

    const [openAddPlaylistView, setOpenAddPlaylistView] = useState(false);
    const [openAddSongView, setOpenAddSongView] = useState(false);

    const [openEditPlaylistView, setOpenEditPlaylistView] = useState(false);
    const [openEditSongView, setOpenEditSongView] = useState(false);

    const [searchPlaylistQuery, setSearchPlaylistQuery] = useState("");
    const [searchSongQuery, setSearchSongQuery] = useState("");

    const [ascendingOrderPlaylist, setAscendingOrderPlaylist] = useState(true);
    const [ascendingOrderSong, setAscendingOrderSong] = useState(true);

    useEffect(async () => {
        getPlaylists();
    }, []);

    return (
        <Box id="main_view_container">
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography fontWeight="bold" fontSize="30px" padding="16px">Playlists</Typography>
                    <List>
                        <Button variant="text" onClick={() => {
                            setOpenAddPlaylistView(true);
                        }}>
                            <Typography fontWeight="bold" fontSize="15px" padding="8px">+ Add new playlist</Typography>
                        </Button>



                        <Stack direction="row" spacing={1}>
                            <Box padding="16px">
                                <TextField id="standard-basic" label="Search playlists" variant="standard"
                                    value={searchPlaylistQuery}
                                    autoComplete='off'
                                    onChange={(event) => {
                                        setSearchPlaylistQuery(event.target.value);
                                        getPlaylists(event.target.value);
                                    }}>
                                </TextField>
                            </Box>

                            {/* <IconButton color="primary" aria-label="sort" onClick={() => {
                                setAscendingOrderPlaylist(!ascendingOrderPlaylist);
                                sortPlaylists(state.playlists, ascendingOrderPlaylist)
                            }}>
                                <SortIcon />
                            </IconButton> */}
                        </Stack>


                        {state.playlists && state.playlists.map(playlist =>
                            <PlaylistItemView key={playlist.id} playlist={playlist} openEditPlaylist={() => {
                                setOpenEditPlaylistView(true);
                            }} />
                        )}
                    </List>
                </Grid>
                <Grid item xs={8}>
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

                        <Stack direction="row" spacing={1}>
                            <Box padding="16px">
                                <TextField id="standard-basic" label="Search songs" variant="standard"
                                    value={searchSongQuery}
                                    autoComplete='off'
                                    onChange={(event) => {
                                        setSearchSongQuery(event.target.value);
                                        getSongs(state.selectedPlaylist.id, event.target.value);
                                    }}>
                                </TextField>
                            </Box>

                            {/* <IconButton color="primary" aria-label="sort" onClick={() => {
                                setAscendingOrderSong(!ascendingOrderSong);

                            }}>
                                <SortIcon />
                            </IconButton> */}
                        </Stack>



                        {state.selectedPlaylist && state.selectedPlaylist.songs && state.selectedPlaylist.songs.map(song =>
                            <SongItemView key={song.id} song={song} openEditSong={() => {
                                setOpenEditSongView(true);
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

            {state.selectedPlaylist && openEditPlaylistView &&
                <AddPlaylistView
                    open={openEditPlaylistView}
                    playlist={state.selectedPlaylist}
                    onClick={() => {
                        setOpenEditPlaylistView(true);
                    }}
                    handleClose={() => setOpenEditPlaylistView(false)}
                />
            }

            {state.selectedSong && openEditSongView &&
                <AddSongView
                    open={openEditSongView}
                    song={state.selectedSong}
                    onClick={() => {
                        setOpenEditSongView(true);
                    }}
                    playlistId={state.selectedPlaylist.id}
                    handleClose={() => setOpenEditSongView(false)}
                />
            }
        </Box>

    );
}

export default MainView;
