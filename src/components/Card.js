import React, { useState } from 'react';
import CardBack from '../assets/images/cardback.jpg';


const Card = ({ width , isClickable}) => {

  const [isSelected, setSelected] = useState(false);

  // 5 for middle
  // 4 for bottom
  // 7 for top
  const cardStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: `${width}em`,
    height: `${width * 1.4}em`,
    backgroundColor: '#22313f',
    color: 'white',
    borderRadius: '3px',
    flexDirection: 'column',
    boxShadow: '3px 4px rgba(0, 0, 0, 0.2)',
    margin: '0.2em',
    '&:hover': {
      borderColor: 'yellow',
      cursor: 'pointer'  
    }
  };

  const cardStyleSelected = {
    ...cardStyle,
    borderColor: 'yellow',
    borderStyle: 'solid',
  };

  const cardTitle = {
    fontFamily: 'Pokerface',
    fontSize: `${width * 0.3}em`,
    margin: '10% auto 20% auto',
    alignSelf: 'flex-start',
  }

  const cardSuit = {
    fontSize: `${width * 0.4}em`,
    width: '100%',
    color: 'white'
  }

  const img = {
    height: '100%',
    width: '100%'
  }

  const onPressHandle = () => {
    setSelected(!isSelected)
  }

  return (
    <div draggable style={isSelected ? cardStyleSelected : cardStyle} onClick={isClickable ? onPressHandle : null}>
      <h1 className="centered" style={cardTitle}>A</h1>
      <div className="centered" style={cardSuit}><span role="img" aria-label="club">♤</span></div>
    </div>
)};

export default Card;

// <h1 style={cardTitle}>A</h1>
// <div style={cardSuit}>♣️</div>