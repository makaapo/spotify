import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid, MenuItem, TextField } from '@mui/material';
import { TrackMutation } from '../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectArtists } from '../../../Artists/artistsSlice';
import { selectAlbums } from '../../../Albums/albumSlice';
import { selectTrackCreateLoading } from '../../tracksSlice';
import { getArtists } from '../../../Artists/artistsThunks';
import { getAlbumsByArtist } from '../../../Albums/albumThunks';

interface Props {
  onSubmit: (state: TrackMutation) => void;
}

const TrackForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbums);
  const creating = useAppSelector(selectTrackCreateLoading);
  const [state, setState] = useState<TrackMutation>({
    album: '',
    title: '',
    duration: '',
    number: 1,
  });
  const [artist, setArtist] = useState({
    title: '',
  });

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  const fetchAlbumsByArtist = async (artistId: string) => {
    await dispatch(getAlbumsByArtist(artistId));
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const artistChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setArtist((prevState) => {
      return { ...prevState, [name]: value };
    });
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
              select
              fullWidth
              required
              label="Artist"
              name="title"
              type="text"
              value={artist.title}
              onChange={artistChangeHandler}
            >
              <MenuItem value="" disabled>
                Please select a Artist
              </MenuItem>
              {artists.map((artist) => (
                <MenuItem key={artist._id} value={artist._id} onClick={() => fetchAlbumsByArtist(artist._id)}>
                  {artist.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs>
            <TextField
              select
              required
              fullWidth
              label="Album"
              name="album"
              type="text"
              value={state.album}
              onChange={inputChangeHandler}
            >
              <MenuItem value="" disabled>
                Please select an album
              </MenuItem>
              {albums &&
                albums.map((album) => (
                  <MenuItem key={album._id} value={album._id}>
                    {album.title}
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
              fullWidth
              label="Duration (mm:ss)"
              name="duration"
              type="text"
              placeholder="mm:ss"
              value={state.duration}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              fullWidth
              label="Number in album"
              name="number"
              type="number"
              value={state.number}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs={3} textAlign="right">
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={creating}>
              {creating ? <CircularProgress size={24} /> : 'Create Track'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TrackForm;
