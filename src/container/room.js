import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import io from "socket.io-client";

import { StoreContext } from 'util/store';
import { Deck } from 'util/engine/deck';
import { Player } from 'util/engine/player';
import { bagiin } from 'util/engine/engine';

import OpponentCards from 'components/opponentCards';
import PlayingCards from 'components/playingCards';
import PlayerCards from 'components/playerCards';

const table = {
  display: 'flex',
  width: '55vw',
  height: '70vh',
  borderRadius: '15px',
  flexDirection: 'column'
};

const ENDPOINT = 'localhost:8080';
const userId = Date.now();
let socket;

const Room = () => {
  // Main room for players come and play a game
  // All logic goes into this route
  const globalStore = useContext(StoreContext);
  const [isPlayingState, setIsPlaying] = globalStore.isPlaying;
  const {roomState, setRoom} = globalStore.room;
  const [userCards, setUserCards] = useState([]);
  const [opponents, setOpponents] = useState([]);
  const [playingCards, setPlayingCards] = useState([])
  let { roomId } = useParams();

  useEffect(() => {
    socket = io(ENDPOINT);
    if (roomId === 'new') {
      roomId = '';
    }
    socket.emit('enterRoom', { roomId, userId }, ({error}) => {
      if(error) {
        alert(error);
      }
    });
    return () => { socket.emit('leaveRoom', { roomId, userId });};
  }, []);

  useEffect(() => {
    socket.on('update', (room) => {
      // Update current game state
      const { gameState, isPlaying } = JSON.parse(room);
      const { players, playingCards, currentTurn, game, round } = gameState;
      const rawOpponent = players.filter((user) => user.userId !== userId);
      const rawUser = players.filter((user) => user.userId === userId)[0];
      setOpponents(rawOpponent.map((user) => ({
        userId: user.userId,
        name: user.name,
        handLeft: user.cards.length, 
        isTurning: currentTurn === user.userId})));
      setPlayingCards(playingCards);
      setUserCards(rawUser.cards);
      setIsPlaying(isPlaying);
    });
  }, []);

  
  
  const kocokHandler = () => {
    //Initiate game by creating deck, shuffle, and bagi the shuffled deck
    if(!isPlayingState && playingCards.length === 0 && opponents.length > 0) {
      const deck = new Deck();
      deck.kocok();
      const bufferPlayersIds = [...opponents, {userId}];
      const players = bufferPlayersIds.map((id) => new Player(id.userId));
      bagiin(players, deck);
      const payload = players.map((player) => ({userId: player.userId, cards: player.getCards()}))
      socket.emit('startGame', JSON.stringify(payload));
    }
  }
  
  return (
    <div style={table}>
      <OpponentCards data={opponents}/>
      <PlayingCards cards={playingCards} kocokHandler={kocokHandler}/>
      <PlayerCards cards={userCards}/>
    </div>
  );
};

export default Room;