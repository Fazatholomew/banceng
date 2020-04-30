import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from "react-router-dom";

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
  };
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

const Login = () => {
  // Main room for players come and play a game
  // Connection to server using socket goes here.
  const globalStore = useContext(StoreContext);
  const [ globalWidthState ] =  globalStore.globalWidth;
  const { setUserInfo } = globalStore.userInfo;
  const [ info, setInfo ] = useState({});
  const [ dataBuffer, setDataBuffer ] = useState('');
  const [ current, setCurrent ] = useState(0);
  const [ title, setTitle ] = useState('Masukin Dulu');
  const history = useHistory();
  const { pathname } = useLocation().state;
  
  const handleSubmit = async (name) => {
    if (dataBuffer.length > 0) {
      if (current < 1) {
        const newData = { ...info };
        newData[name.toLowerCase()] = dataBuffer;
        setInfo(newData);
        setCurrent(current + 1);
        setDataBuffer('');
        setTitle('Masukin Dulu');
      } else {
        const hasil = await auth({ userId: info.userid, password: dataBuffer, type: 'login' })
        if (hasil.status === 403) {
          setTitle('Password atau email salah.');
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
            history.push(pathname || '/room');
          } catch (err) {
            setTitle('Ada error coba lagi.');
            setCurrent(0);
            setDataBuffer(info.userid);
            //console.log(err)
          }
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
      litleInfo: '' 
    },
    { 
      name: 'Password', 
      type: 'password',
      min: 0,
      max: 20,
      litleInfo: ''
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
      <div className='hoverable' onClick={() => history.push('signup')}>Daftar</div>
    </StyledDiv>
  );
};

export default Login;