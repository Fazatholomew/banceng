import React, { useContext } from 'react';

import Card from 'components/card';
import { StoreContext } from 'util/store';
import { compare } from 'util/engine/engine';

const PlayerCards = ({ cards=[] }) => {
  const globalStore = useContext(StoreContext);
  const { globalWidth } =  globalStore
  const { playingCardState } = globalStore.playingCard;
  const { selectedCardState, selectedCardReducer } = globalStore.selectedCard;
  const { setIsPlayable } = globalStore.isPlayable;

  const selectCard = (isSelected, cardObj) => {
    if (isSelected) {
      selectedCardReducer('remove', [cardObj]);
      setIsPlayable(compare(playingCardState, selectedCardState));
    } else {
      selectedCardReducer('add', [cardObj]);
      setIsPlayable(compare(playingCardState, selectedCardState));
    }
  }

  const renderCard = cards.map((card, i) => (
    <Card 
      key={card.displayName} 
      isShown
      isClickable
      width={4 * globalWidth[0]}
      clickHandler={selectCard}
      cardObj={card}
    />
  ));

  return (
    <div style={{height: '33%'}} className="centered">
        {renderCard}
    </div>
  )
};

export default PlayerCards;