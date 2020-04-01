import React, { useState } from 'react';
import styled from 'styled-components';

import Card from 'components/card';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1em;
  height: 33%;
  .column{
    width: ${props => 100 / props.player}%;
    flex-direction: column;
  };
  .name{
    font-size: ${props => 2 * props.width}em;
    margin-top: 0.2em;
  };
  .name[data-left]:after {
    content: attr(data-left);
    position: absolute;
    font-size: .7em;
    background: red;
    color: white;
    width: 1.4em;
    height: 1.4em;
    text-align: center;
    border-radius:50%;
    box-shadow:0 0 1px #333;
 };
`;

const OpponentCards = ({ data=[], width=1 }) => {
  const player = data.length;
  const renderPlayer = data.map((player) => (
    <div key={player.name} className="centered column">
      <Card width={7 * width}/>
      <div className='name' data-left={player.cardLeft}>
        {player.name}
      </div>
    </div>
  ));

  return (
    <StyledDiv player={player - 1} width={width}>
      {renderPlayer}
    </StyledDiv>
  )
};

export default OpponentCards;