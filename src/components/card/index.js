import React, { useState } from 'react';
import CardBack from 'assets/images/cardback.jpg';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: ${props => props.width}em;
  height: ${props => props.width * 1.4}em;
  background-color: white;
  color: ${props => props.color };
  border-radius: 3px;
  flex-direction: column;
  box-shadow: 3px 4px rgba(0, 0, 0, 0.2);
  margin: 0.2em;
  border-color: navy;
  ${props => props.isSelected ? `margin-bottom: ${props.width * 2}em;` : ''}
  &:hover{
    cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  };
  .cardNumber{
    font-family: Pokerface;
    font-size: ${props => props.width * 0.3}em;
    margin: 10% auto 20% auto;
    align-Self: flex-start;
  };
  .cardFace{
    font-size: ${props => props.width * 0.4}em;
    width: 100%;
    color: ${props => props.color };
  };
  img{
    height: 100%;
    width: 100%;
  };
`;

const Card = ({ width , isClickable, isShown, cardObj, clickHandler}) => {
  // Card component
  // render card face and number
  // accept: width (size), isClickable, isShown, face, number

  const [isSelected, setSelected] = useState(false);

  // 5 for middle
  // 4 for bottom
  // 7 for top

  const onPressHandle = () => {
    // toggle isSelected state
    if(clickHandler) {
      //console.log('clicked');
      
      clickHandler(isSelected, cardObj.displayName);
    }
    setSelected(!isSelected)
  }
  if (isShown) {
    return (
      <StyledDiv color={cardObj.color} width={width} isSelected={isSelected} isClickable={isClickable} onClick={isClickable ? onPressHandle : null}>
        <h1 className="centered cardNumber">{cardObj.number}</h1>
        <div className="centered cardFace"><span role="img" aria-label="">{cardObj.suitEmoji}</span></div>
      </StyledDiv>
    )
  } else {
    return (
      <StyledDiv width={width}>
        <img alt="Card" src={CardBack}/>
      </StyledDiv>
    )
  }
};

export default Card;

// <h1 style={cardTitle}>A</h1>
// <div style={cardSuit}>♣️</div>
//#22313f