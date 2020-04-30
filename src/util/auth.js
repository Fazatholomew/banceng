export const hash = (str) => {
  const secret = "qwertyuiop[]\\asdfghjkl;'zxcvbnm,./`1234567890-=QWERTYUIOP{}|ASDFGHJKL:ZXCVBNM<>?~!@#$%^&*()_+";
  let hashed = '';
  let counter = 0;
  let coef = 0;
  for(let j = 0; j < str.length; j++) {
    coef += str[j].charCodeAt();
  }
  for(let i = 0; i < 20; i++) {
    const ascii = str[i % str.length].charCodeAt();
    counter += ascii + coef;
    counter *= 107;
    hashed += secret[counter % secret.length]; 
  }
  return hashed;
};
