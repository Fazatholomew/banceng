import React, { useContext } from 'react';

import Card from 'components/card';
import Action from './actionButton';
import { StoreContext } from 'util/store';


const PlayingCards = ({ kocokHandler, lawanHandler, cussHandler, isTurn, opponentTotal }) => {
  const globalStore = useContext(StoreContext);
  const { globalWidth } =  globalStore;
  const [isPlayingState ] = globalStore.isPlaying;
  const { playingCardState } = globalStore.playingCard;
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
  //console.log(isPlayableState, isTurn, selectedCardState.length > 0, isPlayableState && isTurn && selectedCardState.cards.length > 0);

  
  return (
    <div style={{height: '33%'}} className="centered">
      <div style={{width: '25%'}}  className="centered">
        {isPlayingState ? <Action 
          active={isTurn && playingCardState.length > 0}
          text="Cuss"
          clickHandler={cussHandler}
          color={ isTurn && playingCardState.length > 0 ? '#19b5fe' : '#013243'}
          /> : null}
      </div>
      <div style={{width: '50%'}}  className="centered">
        {renderCard}
      </div>
      <div style={{width: '25%'}}  className="centered">
        {isPlayingState ? (
          <Action
            active={isPlayableState && isTurn && selectedCardState.length > 0} 
            text="Lawan"
            clickHandler={_lawanHandler} 
            color={isPlayableState && isTurn && selectedCardState.length > 0 ? "#f03434" : "#96281b"}/>) : (
          <Action 
            active={opponentTotal > 0} 
            text="Kocok" 
            clickHandler={kocokHandler} 
            color={opponentTotal > 0 ? "#f03434" : "#96281b"}/>)}
      </div>
    </div>
  )
};

export default PlayingCards;