import React, { useContext } from 'react';
import styled from 'styled-components';

import Card from 'components/card';
import { StoreContext } from 'util/store';

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
    color: white;
  };
  .isTurning{
    text-shadow: -1px 0 yellow, 0 1px yellow, 1px 0 black, 0 -1px yellow;
    color: navy;
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

const OpponentCards = ({ data=[] }) => {
  const { globalWidth } =  useContext(StoreContext);
  const players = data.length;
  const renderPlayer = data.map((player) => (
    <div key={player.userId} className="centered column">
      <Card width={7 * globalWidth[0]}/>
      <div className={`name ${player.isTurning ? 'isTurning' : null}`} data-left={player.cards}>
        {player.userId}
      </div>
    </div>
  ));

  return (
    <StyledDiv player={players} width={globalWidth[0]}>
      {renderPlayer}
    </StyledDiv>
  )
};

export default OpponentCards;