import React, { useContext } from 'react';
import styled from 'styled-components';

import { StoreContext } from 'util/store';

const StyledDiv = styled.div`
  background-color: rgba(255,0,0);
  position: absolute;
  z-index: 100;
  padding: 0.5em;
  color: white;
  font-size: ${props => props.width * 1.7}em;
  border-radius: 5px;
  display: flex;
  width: 15vw;
  height: ${props => props.width < 1 ? props.isShown ? '42vh' : '12vh' : props.isShown ? '35vh': '6vh'};
  flex-direction: column;
  .userScore {
    margin-bottom: 0.7em;
  };
`;

const Catet = ({ players=[], game=0, isShown=false, clickHandler }) => {
  const { globalWidth } =  useContext(StoreContext);
  const renderPlayerScore = players.map((player) => (
    <div key={player.userId} className='userScore'>
      {`${player.userId}: ${player.score}`}
    </div>
  ));

  return (
    <StyledDiv className='hoverable' width={globalWidth[0]} isShown={isShown} onClick={clickHandler}>
      <h3 className='centered'>CATETAN</h3>
      {isShown ? renderPlayerScore : null}
      {isShown ? `Game ke-${game}` : null}
    </StyledDiv>
  )
};

export default Catet;

// supposed to be name not userId temporary