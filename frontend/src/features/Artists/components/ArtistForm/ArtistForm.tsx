import {Box, Button, CircularProgress, Grid, TextField} from '@mui/material';
import React, { useState } from 'react';
import {ArtistMutation} from '../../../../types';
import {useAppSelector} from '../../../../app/hooks';
import {selectArtistCreateLoading} from '../../artistsSlice';
import FileInput from '../../../../UI/FileInput/FileInput';

interface Props {
  onSubmit: (state: ArtistMutation) => void;
}

const ArtistForm: React.FC<Props> = ({ onSubmit }) => {
  const creating = useAppSelector(selectArtistCreateLoading);

  const [state, setState] = useState<ArtistMutation>({
    title: '',
    description: '',
    image: null,
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

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
              fullWidth
              label="Title"
              name="title"
              type="text"
              value={state.title}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              fullWidth
              label="Desccription"
              name="description"
              multiline
              rows={4}
              value={state.description}
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
              {creating ? <CircularProgress size={24}/> : 'Create Artist'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ArtistForm;