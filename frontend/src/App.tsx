import {Route, Routes} from 'react-router-dom';
import {Container, Typography} from '@mui/material';
import Home from './features/Home/Home';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import Albums from './features/Albums/Albums';
import Tracks from './features/Tracks/Tracks';
import Register from './features/User/Register';

const App = () => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/albums/:artistId" element={<Albums />} />
          <Route path="/tracks/:albumId" element={<Tracks/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
