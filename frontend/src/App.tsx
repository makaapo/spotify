import { Route, Routes } from 'react-router-dom';
import {Container, Toolbar, Typography} from '@mui/material';
import Home from './features/Home/Home';
import AppToolbar from './UI/AppToolbar/AppToolbar';

const App = () => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;