const { CardSequence } = require('./cardSequence');

export class Player {
  // Player class. Has name and cards in hand.
  constructor(name) {
    this.name = name;
    this.cards = new CardSequence();
  }

  addCards(names) {
    this.cards.addCards(names);
  }

  removeCard(indexes) {
    this.cards.removeCards(indexes);
  }

  getCards() {
    return this.cards.cards;
  }
}
