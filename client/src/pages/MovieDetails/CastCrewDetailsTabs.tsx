/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  Text,
  Box,
  Card,
  CardBody,
  Carousel,
  Heading,
  Paragraph,
  Image,
  Tabs,
  List,
  Tab,
} from 'grommet';
import { string } from 'prop-types';
import React from 'react';
import { Cast, Crew } from './types';

interface Props {
  cast: Cast[];
  crew: Crew[];
  details: any;
}

const CastCrewDetailsTabs = (props: Props) => {
  const [index, setIndex] = React.useState(0);

  // const details = Object.values(props.details).map((el) => {
  //   console.log('123', el);

  //   // return { detail: el. }
  // });

  const cast = props.cast.map((el) => {
    return { name: el.name, character: el.character };
  });

  const crew = props.crew.map((el) => {
    return { name: el.name, job: el.job };
  });

  const onActive = (nextIndex: number) => setIndex(nextIndex);

  console.log(props.details, crew);

  return (
    <Tabs margin={{ top: 'small' }} activeIndex={index} onActive={onActive}>
      <Tab title='Cast'>
        <Box align='center'>
          <List
            primaryKey='name'
            secondaryKey='character'
            step={10}
            paginate
            data={cast}
          />
        </Box>
      </Tab>
      <Tab title='Crew'>
        <Box align='center'>
          <List
            primaryKey='name'
            secondaryKey='job'
            step={10}
            paginate
            data={crew}
          />
        </Box>
      </Tab>
      <Tab title='Details'>
        <Box align='center'>
          <List primaryKey='name' secondaryKey='val' data={props.details} />
        </Box>
      </Tab>
    </Tabs>
  );
};

export default CastCrewDetailsTabs;
