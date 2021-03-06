import React, { createContext, useState } from 'react';
import jwt from 'jwt-decode'

import { CardSequence } from 'util/engine/cardSequence';

export const StoreContext = createContext(null);
export default ({ children }) => {
  const [globalWidthState, setGlobalWidth] = useState(1);
  const [isPlayingState, setPlaying] = useState(false);
  const [playingCardState, _setPlayingCard] = useState(new CardSequence());
  const [selectedCardState, setSelectedCard] = useState(new CardSequence());
  const [isPlayableState, setIsPlayable] = useState(false);
  const [roomState, setRoom] = useState({});
  const [globalWaitState, setGlobalWait] = useState(true);
  const [waitState, setWait] = useState(false);
  const [userInfoState, _setUserInfo] = useState({});
  const [_globalError, setGlobalError] = useState('');
  const [globalTitle, _setGlobalTitle] = useState('Banceng Mowal?');

  const selectedCardReducer = (action, payload) => {
    const bufferCard = selectedCardState;
    switch(action){
      case 'add':
        bufferCard.addCards(payload);
        setSelectedCard(bufferCard);
        break;
      
      case 'remove':
        bufferCard.removeCards(payload);
        setSelectedCard(bufferCard);
        break;

      case 'reset':
        setSelectedCard(new CardSequence());
        break;
      
      default:
        break;
    }
    setWait(false);
  }

  const setPlayingCard = (cards) => {
    const newCards = new CardSequence();
    newCards.addCards(cards);
    _setPlayingCard(newCards);
  }

  const setUserInfo = (token) => {
    if (token) {
      const { userId } = jwt(token);
      if (userId) {
        _setUserInfo({ userId, token });
      }
    } else {
      _setUserInfo({});
    }
    setGlobalWait(false);
  }

  const getGlobalError = () => {
    const error = '' + _globalError;
    setGlobalError('');
    return error;
  }

  const setGlobalTitle = (title) => {
    title ? _setGlobalTitle(title) : _setGlobalTitle('Banceng Mowal?');
  };
  
  const store = {
    globalWidth: [globalWidthState, setGlobalWidth],
    isPlaying: [isPlayingState, setPlaying],
    isPlayable: {isPlayableState, setIsPlayable},
    playingCard: {playingCardState, setPlayingCard},
    selectedCard: {selectedCardState, selectedCardReducer},
    room: {roomState, setRoom},
    userInfo: {userInfoState, setUserInfo},
    wait: {waitState, setWait},
    globalWait: {globalWaitState, setGlobalWait},
    globalError: {getGlobalError, setGlobalError},
    title: {globalTitle, setGlobalTitle}
  };
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
};