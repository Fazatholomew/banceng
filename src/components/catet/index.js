import React, { useContext } from 'react';
import styled from 'styled-components';

import { StoreContext } from 'util/store';

const StyledDiv = styled.div`
  background-color: rgba(255,0,0,0.5);
  padding: 0.5em;
  color: white;
  font-size: ${props => props.width * 1.7}em;
  border-radius: 5px;
  display: flex;
  width: 15vw;
  height: ${props => props.width < 1 ? '42vh' : '35vh'};
  flex-direction: column;
  .userScore {
    margin-bottom: 0.7em;
  };
`;

const Catet = ({ players=[], game=0 }) => {
  const { globalWidth } =  useContext(StoreContext);
  const renderPlayerScore = players.map((player) => (
    <div key={player.userId} className='userScore'>
      {`${player.userId}: ${player.score}`}
    </div>
  ));

  return (
    <StyledDiv width={globalWidth[0]}>
      <h3 className='centered'>CATETAN</h3>
      {renderPlayerScore}
      {`Game ke-${game}`}
    </StyledDiv>
  )
};

export default Catet;

// supposed to be name not userId temporary