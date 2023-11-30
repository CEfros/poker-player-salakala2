const IsOkayBaseHand = require('./IsOkayBaseHand');

class IsNeutralHand {
  static isNeutralHand(card1, card2) {
    if (IsOkayBaseHand.isOkayHand(card1, card2)) {
      return false;
    }

    return card1.suit !== card2.suit;
  }
}

module.exports = IsNeutralHand;
