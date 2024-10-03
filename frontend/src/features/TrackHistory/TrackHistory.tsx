import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../User/usersSlice';
import { selectHistoryFetching, selectTrackHistory } from './TrackHistorySlice';
import { getTrackToHistory } from './TrackHistoryThunks';
import { CircularProgress, Typography } from '@mui/material';
import TrackHistoryCard from './сomponents/TrackHistoryCard';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const trackHistory = useAppSelector(selectTrackHistory);
  const loading = useAppSelector(selectHistoryFetching);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getTrackToHistory());
    }
  }, [user, dispatch]);

  return (
    <div className="container">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {trackHistory && trackHistory.length > 0 ? (
            trackHistory.map((trackFromHistory) => (
              <TrackHistoryCard key={trackFromHistory._id} trackHistory={trackFromHistory} />
            ))
          ) : (
            <Typography variant="subtitle1" textAlign="center" sx={{ flexGrow: 1 }}>
              Tracks history not available
            </Typography>
          )}
        </>
      )}
    </div>
  );
};

export default TrackHistory;
