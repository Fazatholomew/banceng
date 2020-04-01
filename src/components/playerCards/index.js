import React, { useState } from 'react';

import Card from 'components/card';

const playerCards = ({ cards=[], width=1 }) => {
  const renderCard = cards.map((card) => (
    <Card 
      key={card.displayName} 
      isShown
      isClickable
      width={4 * width} 
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

export default playerCards;