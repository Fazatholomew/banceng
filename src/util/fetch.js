import { hash } from './auth';

const url = 'http://localhost:8080/';

export const auth = async ({ userId, password, type }) => {
  // Wrapper function for fecthing user authentication
  const hashed = hash(password);
  try {
    let headers = { 'Content-Type': 'application/json'};
    const response = await fetch(url + 'auth/' + type, {
      method: 'POST',
      headers,
      body: JSON.stringify({userId, password: hashed})
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const newRoom = async ({token}) => {
  // Wrapper function to get new roomId
  try {
    let headers = { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await fetch(url + 'room', {
      method: 'POST',
      headers
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const checkRoom = async ({token, roomId}) => {
  // Wrapper function to get new roomId
  try {
    let headers = { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await fetch(url + 'room/' + roomId, {
      method: 'GET',
      headers
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};