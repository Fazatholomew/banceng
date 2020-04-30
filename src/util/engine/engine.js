const { paket, facesRange, numberValues } = require('./card');

export const compare = (table, hand) => {
  // Compare if cards in hand can beat what's in the table
  // Return true if hand wins
  if (table.length === 0) {
    if (hand.length === 1 || Object.keys(paket).includes(hand.type)){
      return true;
    }
    return false;
  }
  if (table.length === hand.length) {
    switch (table.length) {
      case 1:
        return table.type === hand.type ? hand.cards[0].value > table.cards[0].value : false;

      case 2:
        return table.type === hand.type ? hand.cards[1].value > table.cards[1].value : false;

      case 3:
        return table.type === hand.type ? hand.cards[1].value > table.cards[1].value : false;

      case 5:
        if (table.type === hand.type) {
          // if paket ties
          const tableCards = table.cards.map((card) => card.number);
          const handCards = hand.cards.map((card) => card.number);
          const countTable = {};
          const countHand = {};
          let tableHigh = '';
          let handHigh = '';

          if (['fullhouse', 'bomb'].includes(table.type)) {
            tableCards.forEach((x) => { countTable[x] = (countTable[x] || 0) + 1; });
            handCards.forEach((x) => { countHand[x] = (countHand[x] || 0) + 1; });
            tableHigh = countTable[Object.keys(countTable)[0]] < countTable[Object.keys(countTable)[1]] ? Object.keys(countTable)[1] : Object.keys(countTable)[0];
            handHigh = countHand[Object.keys(countHand)[0]] < countHand[Object.keys(countHand)[1]] ? Object.keys(countHand)[1] : Object.keys(countHand)[0];
          }

          switch (table.type) {
            case 'straight':
              if (tableCards.includes('2') && handCards.includes('2')) {
                return hand.cards[3].value > table.cards[3].value;
              }
              if (tableCards.includes('2') || handCards.includes('2')) {
                return tableCards.includes('2');
              }
              return hand.cards[4].value > table.cards[4].value;

            case 'flush':
              if (table.cards[0].face === hand.cards[0].face) {
                const highestTable = tableCards.includes('2') ? tableCards[3] : tableCards[4];
                const highestHand = handCards.includes('2') ? handCards[3] : handCards[4];
                return highestHand > highestTable;
              }
              return facesRange[hand.cards[0].face] > facesRange[table.cards[0].face];

            case 'fullhouse':
              if (tableHigh === '2' || handHigh === '2') {
                return tableHigh === '2';
              }
              return numberValues[handHigh] > numberValues[tableHigh];

            case 'bomb':
              return numberValues[handHigh] > numberValues[tableHigh];

            case 'straighflush':
              if (table.cards[0].face === hand.cards[0].face) {
                if (tableCards.includes('2') || handCards.includes('2')) {
                  return tableCards.includes('2');
                }
                return numberValues[handCards[4]] > numberValues[tableCards[4]];
              }
              return facesRange[hand.cards[0].face] > facesRange[table.cards[0].face];

            default:
              return '';
          }
        } else {
          // paket different type
          return paket[hand.type] > paket[table.type];
        }

      default:
        return '';
    }
  } else {
    return '';
  }
};

export const bagiin = (players, deck, start = 'A') => {
  // bagiin cards based on deck equally to players in any given start position
  start = numberValues[start] - 1;
  start %= players.length;
  let counter = start;
  while (deck.length > 0) {
    players[counter].addCards([deck.bagi()]);
    counter++;
    if (counter === players.length) {
      counter = 0;
    }
  }
};
