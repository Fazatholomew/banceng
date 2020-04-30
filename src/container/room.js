import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import io from 'socket.io-client';

import { StoreContext } from 'util/store';
import { Deck } from 'util/engine/deck';
import { Player } from 'util/engine/player';
import { bagiin } from 'util/engine/engine';
import { CardSequence } from 'util/engine/cardSequence';

import OpponentCards from 'components/opponentCards';
import PlayingCards from 'components/playingCards';
import PlayerCards from 'components/playerCards';
import Catet from 'components/catet';

const container = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%'
};

const ENDPOINT = 'http://localhost:8080';
let socket;

const Room = () => {
  // Main room for players come and play a game
  // Connection to server using socket goes here.
  const globalStore = useContext(StoreContext);
  const [ globalWidthState, setGlobalWidth ] =  globalStore.globalWidth;
  const [isPlayingState, setIsPlaying] = globalStore.isPlaying;
  const {roomState, setRoom} = globalStore.room;
  const { selectedCardReducer } = globalStore.selectedCard;
  const { setGlobalTitle } = globalStore.title;
  const [userCards, _setUserCards] = useState([]);
  const [opponents, setOpponents] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const { playingCardState, setPlayingCard } = globalStore.playingCard;
  const { roomId } = useParams();
  const history = useHistory();
  const { userInfoState } = globalStore.userInfo;
  const { setGlobalError } = globalStore.globalError;
  const { userId, token } = userInfoState;

  const setUserCards = (displayNames) => {
    const cards = new CardSequence();
    cards.addCards(displayNames);
    _setUserCards(cards.cards);
  }

  const changeWidth = () => {
    if (window.innerWidth < 900 * globalWidthState) {
      setGlobalWidth(window.innerWidth / 1700);
    }
  };
  useEffect(() => {
    changeWidth();
  }, [window.innerWidth]); // eslint-disable-line

  useEffect(() => {
    socket = io(ENDPOINT);
      //console.log("connecting socket....");
      //console.log(JSON.stringify({ token, type: 'ENTER ROOM',  payload: { roomId, userId }}));
      socket.emit('room', JSON.stringify({ token, type: 'ENTER ROOM',  payload: { roomId, userId }}), ({error}) => {
        if(error) {
          switch(error) {
            case "You're already in the room":
              setGlobalError('Udah di dalem, ngapain masuk lagi?');
              history.push('/');
              break;
            
            case "Room is on a game":
              setGlobalError('Kalem se-game dulu.');
              history.push('/');
              break;

            case "Room is full":
              setGlobalError('Lapak penuh.');
              history.push('/');
              break;
            
            default:
              history.push('/');
              break;
          }
        }
      });
    return () => { 
      setGlobalTitle();
      socket.disconnect();
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    socket.on('update', (payload) => {
      // Update current game state
      const payloadParsed = JSON.parse(payload);
      const { room } = payloadParsed;
      //console.log(payloadParsed);
      //console.log(room);
      const { gameState, isPlaying, title, order} = room;
      const { players, playingCards, currentTurn, game, round } = gameState;
      const rawOpponent = players.filter((user) => user.userId !== userId);
      const rawUser = players.filter((user) => user.userId === userId)[0];
      setGlobalTitle(title);
      selectedCardReducer('reset');
      setOpponents(order[userId].map((id) => { 
        const user = rawOpponent.filter((user) => user.userId === id)[0];
        return {
          userId: user.userId,
          name: user.name,
          cards: user.cards.length, 
          isTurning: currentTurn === user.userId
        }
      }));  
      setPlayingCard(playingCards);
      //console.log(rawUser.cards);
      setUserCards(rawUser.cards);
      setIsPlaying(isPlaying);
      setRoom({...roomState, players, game, isTurn: currentTurn === userId, round});
    });

    socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
      // else the socket will automatically try to reconnect
    });
  }, []); // eslint-disable-line

  
  const kocokHandler = () => {
    //Initiate game by creating deck, shuffle, and bagi the shuffled deck
    if(!isPlayingState && playingCardState.length === 0 && opponents.length > 0) {
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
      socket.emit('room', JSON.stringify({ token, type: 'START GAME', payload: { cards, roomId, userId } }), ({error}) => {
        //console.log(error);
      });
    }
  }

  const lawanHandler = (cards) => {
    // next turn with given cards sequence
    // send cards to server
    
    if (cards.length === userCards.length) {
      socket.emit('room', JSON.stringify({
        token,
        type: 'NUTUP',
        payload: { roomId, userId }
      }), ({error}) => {
        //console.log(error);
      });
    } else {
      //console.log('lawan', cards);
      const displayNames = cards.cards.map((card) => card.displayName);
      socket.emit('room', JSON.stringify({
        token,
        type: 'LAWAN',
        payload: { cards: displayNames, roomId, userId }
      }), ({error}) => {
        //console.log(error);
      });
    }
  };

  const cussHandler = () => {
    socket.emit('room', JSON.stringify({
      token,
      type: 'CUSS',
      payload: { roomId, userId }
    }), ({error}) => {
      //console.log(error);
    });
  };
  
  return (
    <div style={container}>
        <Catet
          isShown={isShown} 
          clickHandler={() => setIsShown(!isShown)} 
          players={roomState.players}
          game={roomState.game}
      />
      <OpponentCards data={opponents}/>
      {isPlayingState ? null : <div className='centered' style={{flexDirection: 'column', color: 'white'}}>
        <div>Link: https://banceng.jimmyganteng.com/room/{roomId}</div>
        <div>Room ID: {roomId}</div>
      </div>}
      <PlayingCards 
        kocokHandler={kocokHandler}
        lawanHandler={lawanHandler}
        cussHandler={cussHandler}
        isTurn={roomState.isTurn}
        opponentTotal={opponents.length}
      />
      <PlayerCards cards={userCards}/>
    </div>
  );
};

export default Room;

// <Catet players={roomState.players} game={roomState.game}/>