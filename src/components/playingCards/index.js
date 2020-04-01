import React, { useState } from 'react';

import Card from 'components/card';
import Action from './actionButton';

const PlayingCards = ({ cards=[], width=1 }) => {
  const renderCard = cards.map((card) => (
    <Card 
      key={card.displayName} 
      isShown 
      width={5 * width} 
      face={card.face} 
      number={card.number}
    />
  ));
  
  return (
    <div style={{height: '33%'}} className="centered">
      <div style={{width: '25%'}}  className="centered">
        <Action text="Cuss" color='blue' width={width}/>
      </div>
      <div style={{width: '50%'}}  className="centered">
        {renderCard}
      </div>
      <div style={{width: '25%'}}  className="centered">
        <Action text="Lawan" color='#d91e18' width={width}/>
      </div>
    </div>
  )
};

export default PlayingCards;

// #96281b