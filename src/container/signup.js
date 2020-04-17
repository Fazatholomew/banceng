import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

import Fade from 'react-bootstrap/Fade'

import { StoreContext } from 'util/store';
import { auth } from 'util/fetch';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
  .container {
    display: flex;
    width: 50%;
    height: 50%;
    flex-direction: column;
  }
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

const Signup = () => {
  // Main room for players come and play a game
  // Connection to server using socket goes here.
  const globalStore = useContext(StoreContext);
  const [ globalWidthState ] =  globalStore.globalWidth;
  const { setUserInfo } = globalStore.userInfo;
  const [ info, setInfo ] = useState({});
  const [ dataBuffer, setDataBuffer ] = useState('');
  const [ current, setCurrent ] = useState(0);
  const [ failed, setFailed ] = useState(false);
  const [ failedMsg, setFailedMsg ] = useState('');
  const [ title, setTitle ] = useState('Daftar')
  const history = useHistory();

  const handleSubmit = async (name) => {
    if (dataBuffer.length > 0) {
      if (current < 2) {
        if (current === 0) {
          if (dataBuffer.includes(" ")) {
            setFailed(true);
            setFailedMsg('JANGAN ADA SPASI!');
          }
        }
        const newData = { ...info };
        newData[name.toLowerCase()] = dataBuffer;
        setInfo(newData);
        setCurrent(current + 1);
        setDataBuffer('');
        setTitle('Daftar');
      } else {
        if (!failed) {
          if (info.password === dataBuffer && !failed) {
            const hasil = await auth({ userId: info.userid, password: info.password, type: 'signup' })
            if (hasil.status === 406) {
              setTitle('Udah ada yang punya.');
              setCurrent(0);
              setDataBuffer(info.userid);
            } else if (hasil.status === 500) {
              setTitle('Ada error coba lagi.');
              setCurrent(0);
              setDataBuffer(info.userid);
            } else {
              try {
                const { token } = await hasil.json();
                setUserInfo(token);
                history.push(`/room/`);
              } catch (err) {
                setTitle('Ada error coba lagi.');
                setCurrent(0);
                setDataBuffer(info.userid);
                console.log(err)
              }
            }
          } else {
            setTitle('Password tidak sama.');
            setCurrent(0);
            setDataBuffer(info.userid);
          }
        } else {
          setFailed(false);
          setTitle(failedMsg);
          setCurrent(0);
          setDataBuffer(info.userid);
        }
      }
    } else {
      setTitle(`${name}nya mana?`);
    }
  };
  
  const fields = [
    { 
      name: 'UserID', 
      type: 'text',
      min: 5,
      max: 10,
      litleInfo: 'Jangan ada spasi.' 
    },
    { 
      name: 'Password', 
      type: 'password',
      min: 0,
      max: 20,
      litleInfo: 'Jangan aneh-aneh. Kalau lupa gak bisa direset.' 
    },
    { 
      name: 'Confirm Password', 
      type: 'password',
      min: 0,
      max: 20,
      litleInfo: 'Ulangin lagi.' 
    }
  ].map((field, i) => (
    <Fade in={i === current} unmountOnExit={true} key={field.name}>
      <div className='container centered'>
        <div className='field_container'>
          <input 
            id={field.name}
            className="name"
            type={field.type}
            minLength={field.min}
            maxLength={field.max}
            value={dataBuffer}
            autoFocus={current !== 0}
            placeholder="Jangan"
            onChange={(e) => setDataBuffer(e.target.value)}
            onKeyUp={(e) => e.keyCode === 13 ? handleSubmit(field.name) : null}/>
          <label htmlFor={field.name} className="label">{field.name}</label>
        </div>
        <div className='info'>{field.litleInfo}</div>
      </div>
    </Fade>
  ))

  return (
    <StyledDiv width={globalWidthState}>
      <h1 className='title_registration'>{title}</h1>
      {fields}
    </StyledDiv>
  );
};

export default Signup;