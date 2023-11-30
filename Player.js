const handlePreflop = require('./handlers/preflophandler');
const isPreFlop = require('./helpers/bet-request');

class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    console.log('gamestate Sala1: ', gameState);

    let amount = 0;
    if (isPreFlop.isPreFlop(gameState)) {
      amount = handlePreflop.handlePreflop(gameState);
    }

    bet(amount || 0);
  }

  static showdown(gameState) {
    console.log('showdown gameState', gameState);
  }
}

module.exports = Player;
