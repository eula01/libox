// core libs
import { useState, useEffect } from 'react';
import axios from 'axios';
import FastAverageColor from 'fast-average-color';

// components
import BackdropImage from './BackdropImage';
import TitleText from './TitleText';
import RatingBtn from '../../shared/RatingBtn';
import RatingPanel from './RatingPanel';
import CastCrewDetailsTabs from './CastCrewDetailsTabs';
import AddToListButton from '../../shared/AddToListButton';
import Spinner from '../../shared/Spinner';
import { Box, Button, Image, Text } from 'grommet';
import { LinkPrevious } from 'grommet-icons';

// typescript
import { MovieDetailsData, MovieCreditsData } from './types';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  
  const { id } = useParams<{ id }>();
  const [isLoading, setIsLoading] = useState(true);
  const [mvD, setMovieDetails] = useState({} as MovieDetailsData);
  const [mvC, setMovieCredits] = useState({} as MovieCreditsData);

  const [dir, setDir] = useState('');
  const [col, setCol] = useState('rgba(0,0,0,0)');

  // data fetching & refining
  useEffect(() => {
    const fetchData = async () => {
      const resDetails = await axios(`/movie/${id}`);
      const resCredits = await axios(`/movie/${id}/credits`);
      setMovieDetails(resDetails.data);
      setMovieCredits(() => {
        setDir(
          resCredits.data.crew.find((el: any) => el.job === 'Director').name
        );
        return resCredits.data;
      });
    };
    fetchData();
  }, []);

  // get colour for backdrop
  useEffect(() => {
    const fac = new FastAverageColor();
    fac
      .getColorAsync(`https://www.themoviedb.org/t/p/w300/${mvD.backdrop_path || mvD.poster_path}`)
      .then((res) => {
        setCol(res.rgba);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error('fast-average-color err: ', e);
      });
    return () => {
      fac.destroy();
    };
  }, [mvD]);

  let details = [
    { name: 'Runtime', val: `${mvD.runtime} mins` },
    {
      name: 'Revenue',
      val: `${new Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD',
      }).format(mvD.revenue)}`,
    },
    {
      name: 'Budget',
      val: `${new Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD',
      }).format(mvD.budget)}`,
    },
  ];

  return (
    <>
      {isLoading ? (
        <Spinner size='large' />
      ) : (
        <Box
          pad={{ horizontal: '40px' }}
          background={{ color: col }}
          direction='row'
          justify='between'
        >
          <Box
            width={{ max: '250px' }}
            style={{ position: 'sticky', top: 0 }}
            direction='column'
          >
            <Button secondary alignSelf='start' icon={<LinkPrevious />} />

            <Image
              src={`https://www.themoviedb.org/t/p/original/${mvD.poster_path}`}
            />

            <Box pad={{ top: 'small' }} gap='small' alignSelf='start'>
              <AddToListButton listId='watchlist' movieId={id} />
              <AddToListButton listId='watchedlist' movieId={id} />
              <RatingBtn id={id} />
              <RatingPanel voteScore={mvD.vote_average} />
            </Box>
          </Box>

          <Box background={col}>
            <BackdropImage backdropPath={mvD.backdrop_path} col={col} />

            <Box margin={{ bottom: '100px' }} pad={{ horizontal: 'large' }}>
              <TitleText
                title={mvD.title}
                releaseDate={mvD.release_date}
                director={dir}
              />
              <Box border='top' />
              <Text
                margin={{ vertical: 'small' }}
                style={{ fontFamily: 'Mate SC' }}
              >
                {mvD.tagline?.toUpperCase()}
              </Text>
              <Text>{mvD.overview}</Text>

              <Box alignSelf='start'>
                <CastCrewDetailsTabs
                  cast={mvC.cast}
                  crew={mvC.crew}
                  details={details}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default MovieDetails;
