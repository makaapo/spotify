import { Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import Home from './features/Home/Home';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import Albums from './features/Albums/Albums';
import Tracks from './features/Tracks/Tracks';
import Register from './features/User/Register';
import Login from './features/User/Login';
import TrackHistory from './features/TrackHistory/TrackHistory';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';
import NewTrack from './features/Tracks/NewTrack/NewTrack';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/User/usersSlice';
import NewAlbum from './features/Albums/components/NewAlbum/NewAlbum';
import NewArtist from './features/Artists/NewArtist/NewArtist';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/albums/:artistId" element={<Albums />} />
          <Route path="/tracks/:albumId" element={<Tracks />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/track-history"
            element={
              <ProtectedRoute isAllowed={user && (user.role === 'admin' || user.role === 'user')}>
                <TrackHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/track/new"
            element={
              <ProtectedRoute isAllowed={user && (user.role === 'admin' || user.role === 'user')}>
                <NewTrack />
              </ProtectedRoute>
            }
          />
          <Route
            path="/album/new"
            element={
              <ProtectedRoute isAllowed={user && (user.role === 'admin' || user.role === 'user')}>
                <NewAlbum />
              </ProtectedRoute>
            }
          />
          <Route
            path="/artist/new"
            element={
              <ProtectedRoute isAllowed={user && (user.role === 'admin' || user.role === 'user')}>
                <NewArtist />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
