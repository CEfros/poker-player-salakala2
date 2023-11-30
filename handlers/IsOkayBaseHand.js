class IsOkayBaseHand {
  static sameSuit = [
    ['A', 'K'],
    ['A', 'Q'],
    ['A', 'J'],
    ['A', '10'],
    ['A', '9'],
    ['A', '8'],
    ['A', '7'],
    ['A', '6'],
    ['A', '5'],
    ['A', '4'],
    ['A', '3'],
    ['A', '2'],
    ['K', 'Q'],
    ['K', 'J'],
    ['K', '10'],
    ['K', '9'],
    ['K', '8'],
    ['Q', 'J'],
    ['Q', '10'],
    ['Q', '9'],
    ['J', '10'],
    ['10', '9'],
    ['9', '8'],
    ['8', '7'],
  ];
  static offSuit = [
    ['A', 'K'],
    ['A', 'Q'],
    ['A', 'J'],
    ['A', '10'],
    ['K', 'Q'],
    ['K', 'J'],
    ['Q', 'J'],
  ];

  static isOkayHand(card1, card2) {
    if (this.isSameCard(card1, card2)) {
      console.log('same ranked cards in hand');
      return true;
    }

    if (this.isSameSuit(card1, card2)) {
      for (let i = 0; i < this.sameSuit.length; i++) {
        if (
          (card1.rank === this.sameSuit[i][0] && card2.rank === this.sameSuit[i][1]) ||
          (card1.rank === this.sameSuit[i][1] && card2.rank === this.sameSuit[i][0])
        ) {
          console.log('same suited cards in hand');
          return true;
        }
      }
      return false;
    }

    for (let i = 0; i < this.offSuit.length; i++) {
      if (
        (card1.rank === this.offSuit[i][0] && card2.rank === this.offSuit[i][1]) ||
        (card1.rank === this.offSuit[i][1] && card2.rank === this.offSuit[i][0])
      ) {
        return true;
      }
    }
    return false;
  }

  static isSameSuit(card1, card2) {
    console.log('checking if cards in hand are of same suit');
    return card1.suit === card2.suit;
  }

  static isSameCard(card1, card2) {
    console.log('checking if cards in hand are of same rank');
    return card1.rank === card2.rank;
  }
}

module.exports = IsOkayBaseHand;
