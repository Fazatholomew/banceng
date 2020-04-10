import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import io from "socket.io-client";

import { StoreContext } from 'util/store';
import { Deck } from 'util/engine/deck';
import { Player } from 'util/engine/player';
import { bagiin } from 'util/engine/engine';
import { CardSequence } from 'util/engine/cardSequence';

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
let socket;

const Room = () => {
  // Main room for players come and play a game
  // Connection to server using socket goes here.
  const globalStore = useContext(StoreContext);
  const [isPlayingState, setIsPlaying] = globalStore.isPlaying;
  const {roomState, setRoom} = globalStore.room;
  const [userCards, _setUserCards] = useState([]);
  const [opponents, setOpponents] = useState([]);
  const [playingCards, setPlayingCards] = useState([])
  const { roomId } = useParams();
  const { userId } = globalStore.userInfo;

  const setUserCards = (displayNames) => {
    const cards = new CardSequence();
    cards.addCards(displayNames);
    _setUserCards(cards.cards);
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    const payload = JSON.stringify({ roomId, userId });
    socket.emit('room', JSON.stringify({ type: 'ENTER ROOM',  payload}), ({error}) => {
      if(error) {
        console.log(error);
      }
    });
    return () => { socket.emit('leaveRoom', { roomId, userId });};
  }, []);

  useEffect(() => {
    socket.on('update', (payload) => {
      // Update current game state
      const payloadParsed = JSON.parse(payload);
      const { room } = payloadParsed;
      console.log(payloadParsed);
      console.log(room);
      const { gameState, isPlaying } = room;
      const { players, playingCards, currentTurn, game, round } = gameState;
      const rawOpponent = players.filter((user) => user.userId !== userId);
      const rawUser = players.filter((user) => user.userId === userId)[0];
      setOpponents(rawOpponent.map((user) => ({
        userId: user.userId,
        name: user.name,
        cards: user.cards.length, 
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
      const cards = {};
      players.forEach((player) => {
        const playerCards = {};
        player.getCards().forEach((element) => {playerCards[element.displayName] = 1;});
        cards[player.name] = playerCards;
        // supposed to be id but name is used for now
      });
      const payload = JSON.stringify({ cards, roomId })
      socket.emit('room', JSON.stringify({ type: 'START GAME', payload }), ({error}) => {
        console.log(error);
      });
    }
  }

  const lawanHandler = (cards) => {
    // next turn with given cards sequence
    // send cards to server
    const displayNames = cards.cards.map((card) => card.displayName);
    socket.emit('lawan', JSON.stringify({
      roomId,
      userId,
      payload: displayNames
    }), ({error}) => {
      console.log(error);
    });
  }
  
  return (
    <div style={table}>
      <OpponentCards data={opponents}/>
      <PlayingCards 
        cards={playingCards} 
        kocokHandler={kocokHandler}
        lawanHandler={lawanHandler}
      />
      <PlayerCards cards={userCards}/>
    </div>
  );
};

export default Room;