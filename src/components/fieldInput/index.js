import React from 'react';
import styled from 'styled-components';

import Fade from 'react-bootstrap/Fade'

const StyledDiv = styled.div`
  display: flex;
  width: 50%;
  height: 50%;
  flex-direction: column;
  .field_container {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 100%;
  };
  .title_registration {
    margin-top: 1em;
    font-size: ${props => 5 * props.width}em;
  }
  .name {
    color: white;
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid white;
    outline: 0;
    font-size: ${props => 3 * props.width}em;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
    &::placeholder {
      color: transparent;
    };
  
    &:placeholder-shown ~ .label {
      font-size: ${props => 4 * props.width}rem;
      cursor: text;
      top: 20px;
    };
  };
  .label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: ${props => 2 * props.width}rem;
  };
  .name:focus {
    ~ .label {
      position: absolute;
      top: -${props => 35 * props.width}%;
      display: block;
      transition: 0.2s;
      font-size: ${props => 3 * props.width}rem;
      color: red;
      font-weight:700;    
    };
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 5px;
    border-image: linear-gradient(to right, red, blue);
    border-image-slice: 1;
  };
  .info {
    width: 100%;
  }
 };
`;

const FieldInput = ({data, show = 0, width, bufferHandler, bufferValue, submitHandler}) => {
  // Main room for players come and play a game
  // Connection to server using socket goes here.
  const fields = data.map((field, i) => (
    <Fade in={i === show} unmountOnExit={true} key={field.name}>
      <StyledDiv className='centered' width={width}>
        <div className='field_container'>
          <input 
            id={field.name}
            className="name"
            type={field.type}
            minLength={field.min}
            maxLength={field.max}
            value={bufferValue}
            autoFocus={show !== 0}
            placeholder="Jangan"
            onChange={(e) => bufferHandler(e.target.value)}
            onKeyUp={(e) => e.keyCode === 13 ? submitHandler(field.name) : null}/>
          <label htmlFor={field.name} className="label">{field.name}</label>
        </div>
        <div className='info'>{field.litleInfo}</div>
      </StyledDiv>
    </Fade>
  ))

  return fields;
};

export default FieldInput;