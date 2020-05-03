import React, { useContext } from 'react';
import styled from 'styled-components';

import { StoreContext } from 'util/store';

const StyledDiv = styled.div`
  .button {
    background-color: ${props => props.color};
    color: white;
    font-size: ${props => props.width * 3}em;
    width: 3em;
    height: 3em;
    border-radius: 10em;
  };
  .button:hover{
    cursor: ${props => props.activate ? 'pointer' : 'default'};
  };
`;

const Action = ({ color, clickHandler, text, active }) => {
const { globalWidth } =  useContext(StoreContext);
  return (
      <StyledDiv 
        activate={active} 
        width={globalWidth[0]} 
        className="centered" 
        onClick={active ? clickHandler : null} 
        color={color}>
        <div className="centered button">
          {text}
        </div>
      </StyledDiv>
  )
};

export default Action;