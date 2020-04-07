import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import io from "socket.io-client";
import Form from 'react-bootstrap/Form';

let socket;
const ENDPOINT = 'localhost:8080';

const Login = () => {
  // const history = useHistory();
  // .push('/someRoute')
  useEffect(() => {

    socket = io(ENDPOINT);

    socket.emit('join', {}, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, []);
  const [room, setRoom] = useState();

  const handleChange = (e) => {
    setRoom(e.value);
  }
  return (
  <div>
    <h1>Hello World!</h1>
    <Form.Control onChange={handleChange} />
    <Link to={`/room/${room}`}>Enter Room</Link>
  </div>
  )
};

export default Login;