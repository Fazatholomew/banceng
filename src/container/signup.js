import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

import FieldInput from 'components/fieldInput';

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
                //console.log(err)
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
  ];

  return (
    <StyledDiv width={globalWidthState}>
      <h1 className='title_registration'>{title}</h1>
      <FieldInput 
        width={globalWidthState}
        show={current}
        bufferHandler={setDataBuffer}
        bufferValue={dataBuffer}
        submitHandler={handleSubmit}
        data={fields}
      />
    </StyledDiv>
  );
};

export default Signup;