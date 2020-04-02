import React, { useContext } from 'react';

import Card from 'components/card';
import Action from './actionButton';
import { StoreContext } from 'util/store';


const PlayingCards = ({ cards=[] }) => {
  const { globalWidth } =  useContext(StoreContext);
  const renderCard = cards.map((card) => (
    <Card 
      key={card.displayName} 
      isShown 
      width={5 * globalWidth[0]} 
      face={card.face} 
      number={card.number}
    />
  ));
  
  return (
    <div style={{height: '33%'}} className="centered">
      <div style={{width: '25%'}}  className="centered">
        <Action text="Cuss" color='blue'/>
      </div>
      <div style={{width: '50%'}}  className="centered">
        {renderCard}
      </div>
      <div style={{width: '25%'}}  className="centered">
        <Action text="Lawan" color='#d91e18'/>
      </div>
    </div>
  )
};

export default PlayingCards;

// #96281b