import React, {useContext, useState} from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

import FieldInput from 'components/fieldInput';

import { StoreContext } from 'util/store';
import { newRoom, checkRoom } from 'util/fetch';

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
  const { token } = userInfoState;
  const [room, setRoom] = useState();
  const [title, setTitle] = useState('Masuk Lapak');

  const handleSubmit = async () => {
    if (room) {
      if (room.length === 10) {
        const response = await checkRoom({token, roomId: room});
        if (response.status === 500) {
          setTitle('Ada error coba lagi.');
        } else if (response.status === 429) {
          setTitle('Lapak penuh');
          setRoom('');
        } else {
          try {
            const { roomId } = await response.json();
            history.push(`/room/${roomId}`);
          } catch (err) {
            setTitle('Ada error coba lagi.');
            console.log(err)
          }
        }
        history.push(`/room/${room}`)
      }
    } else {
      console.log('asking for new room');
      const response = await newRoom({token});
      if (response.status === 500) {
        setTitle('Ada error coba lagi.');
      } else {
        try {
          const { roomId } = await response.json();
          history.push(`/room/${roomId}`);
        } catch (err) {
          setTitle('Ada error coba lagi.');
          console.log(err)
        }
      }
    }
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
  </StyledDiv>
  )
};

export default Lobby;