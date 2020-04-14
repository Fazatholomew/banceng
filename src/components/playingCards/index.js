import React, { useContext, useState } from 'react';

import Card from 'components/card';
import Action from './actionButton';
import { StoreContext } from 'util/store';


const PlayingCards = ({ kocokHandler, lawanHandler, cussHandler, isTurn }) => {
  const globalStore = useContext(StoreContext);
  const { globalWidth } =  globalStore;
  const [isPlayingState, setIsPlaying] = globalStore.isPlaying;
  const { playingCardState, setPlayingCard } = globalStore.playingCard;
  const { selectedCardState, selectedCardReducer } = globalStore.selectedCard;
  const { isPlayableState } = globalStore.isPlayable;

  const _lawanHandler = () => {
    //send selected Card to server
    lawanHandler(selectedCardState);
    selectedCardReducer('reset');
  };

  const renderCard = playingCardState.cards.map((card) => (
    <Card 
      key={card.displayName}
      isShown
      width={5 * globalWidth[0]} 
      cardObj={card}
    />
  ));
  
  return (
    <div style={{height: '33%'}} className="centered">
      <div style={{width: '25%'}}  className="centered">
        {isPlayingState ? <Action 
          active={isTurn && playingCardState.cards.length > 0}
          text="Cuss"
          clickHandler={cussHandler}
          color={isTurn && playingCardState.cards.length > 0 ? '#19b5fe' : '#013243'}
          /> : null}
      </div>
      <div style={{width: '50%'}}  className="centered">
        {renderCard}
      </div>
      <div style={{width: '25%'}}  className="centered">
        {isPlayingState ? (
          <Action
            active={isPlayableState && isTurn && selectedCardState.cards.length > 0} 
            text="Lawan"
            clickHandler={_lawanHandler} 
            color={isPlayableState && isTurn && selectedCardState.cards.length > 0 ? '#d91e18' : '#96281b'}/>) : (
          <Action 
            active 
            text="Kocok" 
            clickHandler={kocokHandler} 
            color="#d91e18"/>)}
      </div>
    </div>
  )
};

export default PlayingCards;

// #96281b