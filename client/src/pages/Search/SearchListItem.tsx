/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import placeholderMoviePoster from '../../assets/placeholderMoviePoster.png';

import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text,
  Grid,
} from 'grommet';

import AddToListButton from '../../shared/AddToListButton';
import { useHistory } from 'react-router';

interface SearchListItemProps {
  id: number;
  title: string;
  desc: string;
  poster?: string;
  date?: string
}

const SearchListItem = ({ id, title, desc, poster, date }: SearchListItemProps) => {
  const history = useHistory();

  const onClickHandle = (e: any) => {
    console.log(id);
    
    history.push(`/movie/${id}`);
  };

  return (
    // TODO: split this component up into smaller, more reusable components
    <Card
      border={{
        color: 'light-3',
        size: 'xsmall',
        style: 'solid',
        side: 'all',
      }}
      elevation='small'
      direction='row'
      pad={{ right: 'medium' }}
      margin={{ vertical: 'xsmall' }}
    >
      <CardBody
        width={{ min: '140px', max: '140px' }}
        pad={{ right: 'medium' }}
      >
        <Image
          fit='cover'
          fallback={placeholderMoviePoster}
          // http://image.tmdb.org/t/p/w185/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg
          src={`http://image.tmdb.org/t/p/w500${poster}`}
          a11yTitle={`${title} poster`}
        />
      </CardBody>
      <Box direction='column'>
        <Box direction='row'>
          <Heading
            level='3'
            size='small'
            alignSelf='end'
            margin={{ bottom: 'none' }}
            onClick={onClickHandle}
          >
            {title}
          </Heading>
          <Text alignSelf='end' color='dark-4' margin={{ left: 'small' }}>
            {date ? date.slice(0, 4) : null}
          </Text>
        </Box>
        <Grid border='top' margin={{ vertical: 'xsmall' }} />
        <Box direction='column'>
          <Text wordBreak='break-word' size='small'>
            {desc}
          </Text>
          <CardFooter
            direction='row'
            justify='start'
            pad={{ vertical: 'small' }}
          >
            <AddToListButton listId='watchlist' movieId={id} />
            <AddToListButton listId='watchedlist' movieId={id} />
          </CardFooter>
        </Box>
      </Box>
    </Card>
  );
};

SearchListItem.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};

export default SearchListItem;
