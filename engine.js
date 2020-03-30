const numbers = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2'];
const faces = {
  'Club': '♣️',
  'Heart': '♥️',
  'Diamond': '♦️',
  'Spade': '♠️',
}
const paket = ['pair', 'tris', 'straight', 'flush', 'fullhouse', 'straight flush', 'royal flush'];
const baseDeck = {};
let index = 0;
numbers.forEach(number => {
  Object.keys(faces).forEach(face => {
    baseDeck[number + " " + face] = index;
    index++;
  });
});


console.log(baseDeck);