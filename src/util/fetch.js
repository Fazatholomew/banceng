const url = 'http://localhost:8080/';

export const auth = async ({ payload, token, type }) => {
  // Wrapper function for fecthing user authentication
  let headers = { 'Content-Type': 'application/json'};
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const response = await fetch(url + 'auth/' + type, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
  return response.json();
};