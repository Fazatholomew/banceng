import React, { useState } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  .btn {
    background-color: ${props => props.color};
    color: white;
    font-size: ${props => props.width * 3}em;
    width: 3em;
    height: 3em;
    border-radius: 10em;
  };
  &:hover{
    cursor: ${props => props.activate ? 'pointer' : 'default'};
  };
`;

const Action = ({ color, width=1, clickHandler, text, active }) => (
    <StyledDiv width={width} className="centered" onClick={clickHandler} color={color}>
      <div className="centered btn">
        {text}
      </div>
    </StyledDiv>
);

export default Action;