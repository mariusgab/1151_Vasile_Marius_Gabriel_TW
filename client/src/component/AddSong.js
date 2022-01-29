import React, { useCallback, useState } from 'react';
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

function AddSongView(props) {
    const dispatch = useDispatch();
    const { postSong } = bindActionCreators(actions, dispatch);

    const [titlu, setTitlu] = useState("");
    const [url, setUrl] = useState("");
    const [stil, setStil] = useState("");
    const [errorText, setErrorText] = useState("");

    const close = () => {
        setTitlu("");
        setUrl("");
        setStil("");
        setErrorText("");
        props.handleClose();
    };

    const onClickDone = useCallback(async () => {
        if (titlu.length > 3) {
            const song = {
                titlu: titlu,
                url: url,
                stil: stil
            };
            postSong(song, props.playlistId);

            close();
        }
        else {
            setErrorText("Invalid field!");
        }

    }, [postSong, props, close]);

    return (
        <Box>
            <Dialog
                onClose={close}
                aria-labelledby="customized-dialog-title"
                open={props.open}>

                <Stack>
                    <Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '27px' }} style={{ margin: '16px' }} align="center">Add New Song</Typography>

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

                            <TextField id="standard-basic" label="Titlu" variant="standard"
                                error={errorText.length <= 3 ? false : true}
                                onChange={(event) => {
                                    setTitlu(event.target.value);
                                }}>
                            </TextField>

                            <TextField id="standard-basic" label="URL" variant="standard"
                                error={errorText.length <= 3 ? false : true}
                                onChange={(event) => {
                                    setUrl(event.target.value);
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

export default AddSongView;