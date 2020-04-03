import React, { createContext, useState } from 'react';

import { CardSequence } from 'util/engine/cardSequence';

export const StoreContext = createContext(null);
export default ({ children }) => {
  const [globalWidthState, setGlobalWidth] = useState(1);
  const [isPlayingState, setPlaying] = useState(false);
  const [playingCardState, setPlayingCard] = useState(new CardSequence());
  const [selectedCardState, setSelectedCard] = useState(new CardSequence());
  const [isPlayableState, setIsPlayable] = useState(false);

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
  }

  const store = {
    globalWidth: [globalWidthState, setGlobalWidth],
    isPlaying: [isPlayingState, setPlaying],
    isPlayable: {isPlayableState, setIsPlayable},
    playingCard: {playingCardState, setPlayingCard},
    selectedCard: {selectedCardState, selectedCardReducer}
  };
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
};