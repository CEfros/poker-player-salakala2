class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    console.log('gamestate Sala1: ', gameState);
    bet(0);
  }

  static showdown(gameState) {
    console.log('showdown gameState', gameState);
  }
}

module.exports = Player;
