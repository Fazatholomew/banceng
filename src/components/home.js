import React, { useState, useContext } from 'react';

import { StoreContext } from 'util/store';
import { Deck } from 'util/engine/deck';
import { Player } from 'util/engine/player';
import { bagiin } from 'util/engine/engine';

import OpponentCards from './opponentCards';
import PlayingCards from './playingCards';
import PlayerCards from './playerCards';


const table = {
  display: 'flex',
  width: '55vw',
  height: '70vh',
  borderRadius: '15px',
  flexDirection: 'column'
};

const _players = ['Byandika! @Boss', 'jane', 'medina', 'joko']

const Home = () => {
  // Main room for players come and play a game
  // All logic goes into this route
  const globalStore = useContext(StoreContext);
  const [isPlayingState, setIsPlaying] = globalStore.isPlaying;
  const [players, setPlayers] = useState();
  const [user, setUsers] = useState(new Player(_players.pop()));
  const [opponents, setOpponents] = useState(_players.map((name) => new Player(name)));
  const [playingCards, setPlayingCards] = useState([])
  
  const kocokHandler = () => {
    //Initiate game by creating deck, shuffle, and bagi the shuffled deck
    if(!isPlayingState && playingCards.length === 0) {
      const deck = new Deck();
      deck.kocok();
      const bufferPlayers = [...opponents, user];
      bagiin(bufferPlayers, deck);
      setPlayers(bufferPlayers);
      setUsers(bufferPlayers.pop());
      setOpponents(bufferPlayers);
      setIsPlaying(true);
    }
  }
  
  return (
    <div style={table}>
      <OpponentCards data={opponents}/>
      <PlayingCards cards={playingCards} kocokHandler={kocokHandler}/>
      <PlayerCards cards={user.getCards()}/>
    </div>
  );
};

export default Home;