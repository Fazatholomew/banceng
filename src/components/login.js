import React, {useContext, useState} from 'react';
import { useHistory } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { StoreContext } from 'util/store';

const Login = () => {
  // const history = useHistory();
  // .push('/someRoute')
  const history = useHistory();
  const globalStore = useContext(StoreContext);
  const { userId } = globalStore.userInfo;
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
      const response = await fetch('http://localhost:8080/room', requestOptions)
      const data = await response.json();
      history.push(`/room/${data.roomId}`);
    }
  }

  return (
  <div>
    <h1>Hello World!</h1>
    <Form.Control onChange={(e) => console.log(e)} />
    <Button variant='dark' onClick={handleSubmit}/>
  </div>
  )
};

export default Login;