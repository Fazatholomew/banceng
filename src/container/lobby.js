import React, {useContext, useState} from 'react';
import { useHistory } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { StoreContext } from 'util/store';

const Lobby = () => {
  const history = useHistory();
  const globalStore = useContext(StoreContext);
  const { userInfoState } = globalStore.userInfo;
  const { userId, token } = userInfoState;
  const [room, setRoom] = useState();

  const handleSubmit = async () => {
    if (room) {
      history.push(`/room/${room}`)
    } else {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      };
      console.log('asking for new room');
      const response = await fetch('http://localhost:8080/room', requestOptions)
      const data = await response.json();
      history.push(`/room/${data.roomId}`);
    }
  }

  return (
  <div>
    <h1>Hello World!</h1>
    <Form.Control onChange={(e) => setRoom(e.target.value)} placeholder="Room ID. (Leave blank to create a new room" />
    <Button variant='dark' onClick={handleSubmit}>Enter Room</Button>
  </div>
  )
};

export default Lobby;