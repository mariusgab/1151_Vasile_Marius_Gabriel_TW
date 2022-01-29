import React, { useCallback, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../redux/actions";
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function AddPlaylistView(props) {
    const dispatch = useDispatch();
    const { postPlaylist, updatePlaylist } = bindActionCreators(actions, dispatch);

    const { playlist } = props;

    const [descriere, setDescriere] = useState("");
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        if (playlist) {
            setDescriere(playlist.descriere);
        }
    }, []);

    const close = () => {
        setDescriere("");
        setErrorText("");
        props.handleClose();
    };

    const onClickDone = useCallback(async () => {
        if (descriere.length > 3) {
            let editingPlaylist = playlist;

            if (editingPlaylist) {
                const playlist = {
                    descriere: descriere,
                    data: Date.now(),
                    id: editingPlaylist.id
                };
                updatePlaylist(playlist);
            }
            else {
                const playlist = {
                    descriere: descriere,
                    data: Date.now()
                };
                postPlaylist(playlist);
            }

            close();
        }
        else {
            setErrorText("Invalid field!");
        }

    }, [postPlaylist, props, close]);

    return (
        <Box>
            <Dialog
                onClose={close}
                aria-labelledby="customized-dialog-title"
                open={props.open}>

                <Stack>
                    <Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '27px' }} style={{ margin: '16px' }} align="center">Add New Playlist</Typography>

                        <IconButton
                            aria-label="close"
                            onClick={props.handleClose}
                            style={{ color: 'grey', position: 'absolute' }}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box >

                    <DialogContent >
                        <Box sx={{ display: 'flex', p: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center', flexGrow: 1 }}>

                            <TextField id="standard-basic" label="Descriere" variant="standard"
                                error={errorText.length <= 3 ? false : true}
                                value={descriere}
                                autoComplete='off'
                                onChange={(event) => {
                                    setDescriere(event.target.value);
                                }}>
                            </TextField>

                        </Box>
                    </DialogContent>

                </Stack>


                <DialogActions sx={{ margin: '8px' }}>
                    <Button autoFocus onClick={onClickDone}>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
}

export default AddPlaylistView;