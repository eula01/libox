// core libs
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// components
import { Search } from 'grommet-icons';
import { Box, TextInput } from 'grommet';

// redux
import {
  updateQuery,
  selectQuery,
  searchMovies,
} from '../../slices/search/searchSlice';

// i know you shouldn't actually store this component's state in redux,
// as it is completely local to this component, but i wanted to test out
// the redux toolkit lib.

const NavbarSearch = () => {
  // useDispatch returns a reference to the dispatch function from the Redux store
  const dispatch = useDispatch();
  // useHistory hook returns the history instance
  const history = useHistory();

  // query from Redux
  const query = useSelector(selectQuery);

  const handleSubmit = ({ code }) => {
    if (code === 'Enter' && query) {
      // update URL route, thus rendering the 'Search' page
      history.push(`/search?query=${query}`);
      // dispatch thunk, updating redux with search results
      dispatch(searchMovies());
    }
  };

  return (
    <Box width='medium' gap='medium'>
      <TextInput
        value={query}
        onKeyDown={handleSubmit}
        onChange={(e) => dispatch(updateQuery(e.target.value))}
        icon={<Search />}
        placeholder='search for a movie! ...'
      />
    </Box>
  );
};

export default NavbarSearch;
