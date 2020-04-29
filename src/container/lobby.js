import React, {useContext, useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

import FieldInput from 'components/fieldInput';

import { StoreContext } from 'util/store';
import { newRoom } from 'util/fetch';

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

const Lobby = () => {
  const history = useHistory();
  const globalStore = useContext(StoreContext);
  const [ globalWidthState ] = globalStore.globalWidth;
  const { userInfoState } = globalStore.userInfo;
  const { getGlobalError } = globalStore.globalError;
  const { setUserInfo } = globalStore.userInfo;
  const { token } = userInfoState;
  const [room, setRoom] = useState('');
  const [title, setTitle] = useState('Masuk Lapak');

  useEffect(() => {
    const error = getGlobalError();
    if (error.length > 0) {
      setTitle(error);
    }
  }, [])

  const handleSubmit = async () => {
    if (room) {
      if (room.length === 10) {
        history.push(`/room/${room}`);
      } else {
        setTitle('Ngawur, gak ada lapaknya!');
      }
    } else {
      console.log('asking for new room');
      const response = await newRoom({token});
      if (response.status === 500) {
        setTitle('Ada error coba lagi.');
      } else {
        try {
          const { roomId } = await response.json();
          console.log(roomId);
          history.push(`/room/${roomId}`);
        } catch (err) {
          setTitle('Ada error coba lagi.');
          console.log(err)
        }
      }
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    setUserInfo();
    history.push('/');
  }

  const fields = [
    {
      name: 'RoomID', 
      type: 'text',
      min: 0,
      max: 10,
      litleInfo: 'Kalau mau buka lapak baru, kosongin aja.'
    }
  ];

  return (
    <StyledDiv width={globalWidthState}>
      <h1 className='title_registration'>{title}</h1>
      <FieldInput 
        width={globalWidthState}
        bufferHandler={setRoom}
        bufferValue={room}
        submitHandler={handleSubmit}
        data={fields}
      />
      <div className='hoverable' onClick={handleLogout}>Logout</div>
  </StyledDiv>
  )
};

export default Lobby;