import React from 'react';

import OpponentCards from './opponentCards';
import PlayingCards from './playingCards';
import PlayerCards from './playerCards';

const table = {
  display: 'flex',
  width: '55vw',
  height: '70vh',
  backgroundColor: 'rgba(255,255,255,0.5)',
  borderRadius: '15px',
  flexDirection: 'column'
};

let width = 1;

if (window.innerWidth < 900) {
  width = window.innerWidth / 1700
}

const Home = () => {
  const data = [
    {name: 'Byandika! @Boss', cardLeft: 13},
    {name: 'jane', cardLeft: 1},
    {name: 'doe', cardLeft: 3},
  ];

  const cards = [
    {displayName: 'jonny', number: '3', face:'♥'},
    {displayName: 'jane', number: '5', face:'♥'},
    {displayName: 'jonnys', number: '3', face:'♥'},
    {displayName: 'janes', number: '5', face:'♥'},
    {displayName: 'jonnya', number: '3', face:'♥'},
  ];
  return (
    <div style={table}>
      <OpponentCards data={data} width={width}/>
      <PlayingCards cards={cards} width={width}/>
      <PlayerCards cards={cards} width={width}/>
    </div>
  );
};

export default Home;