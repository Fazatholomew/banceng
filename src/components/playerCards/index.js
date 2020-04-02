import React, { useContext } from 'react';

import Card from 'components/card';
import { StoreContext } from 'util/store';

const PlayerCards = ({ cards=[] }) => {
  const { globalWidth } =  useContext(StoreContext);
  const renderCard = cards.map((card) => (
    <Card 
      key={card.displayName} 
      isShown
      isClickable
      width={4 * globalWidth[0]} 
      face={card.face} 
      number={card.number}
    />
  ));

  return (
    <div style={{height: '33%'}} className="centered">
        {renderCard}
    </div>
  )
};

export default PlayerCards;