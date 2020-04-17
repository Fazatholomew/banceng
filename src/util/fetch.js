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