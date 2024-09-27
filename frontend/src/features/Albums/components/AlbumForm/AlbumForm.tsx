import React, { useEffect, useState } from 'react';

import {Box, Button, CircularProgress, Grid, MenuItem, TextField} from '@mui/material';
import {AlbumMutation} from '../../../../types';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import {selectArtists} from '../../../Artists/artistsSlice';
import {selectAlbumCreateLoading} from '../../albumSlice';
import {getArtists} from '../../../Artists/artistsThunks';
import FileInput from '../../../../UI/FileInput/FileInput';


interface Props {
  onSubmit: (state: AlbumMutation) => void;
}

const AlbumForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const creating = useAppSelector(selectAlbumCreateLoading);

  const [state, setState] = useState<AlbumMutation>({
    artist: '',
    title: '',
    release: '',
    image: null,
  });

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setState((prevState) => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const onSubmitArtist = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(state);
  };

  return (
    <>
      <Box component="form" onSubmit={onSubmitArtist}>
        <Grid container item xs={6} direction="column" spacing={2} mx="auto">
          <Grid item xs>
            <TextField
              required
              select
              fullWidth
              label="Artist"
              name="artist"
              type="text"
              value={state.artist}
              onChange={inputChangeHandler}
            >
              <MenuItem value="" disabled>
                Please select a Artist
              </MenuItem>
              {artists.map((artist) => (
                <MenuItem key={artist._id} value={artist._id}>
                  {artist.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <TextField
              required
              fullWidth
              label="Title"
              name="title"
              value={state.title}
              type="text"
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              fullWidth
              label="Year of release"
              name="release"
              value={state.release}
              type="number"
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs={6}>
            <FileInput
              name="image"
              label="Image"
              onChange={fileInputChangeHandler}
            />
          </Grid>

          <Grid item xs={3} textAlign="right">
            <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}} disabled={creating}>
              {creating ? <CircularProgress size={24}/> : 'Create Album'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AlbumForm;