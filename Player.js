const { handlePreflop } = require('./handlers/preflophandler');
const { isPreFlop } = require('./helpers/bet-request');

class Player {
  static get VERSION() {
    return '0.3';
  }

  static betRequest(gameState, bet) {
    try {
      console.log('gamestate Sala1: ', gameState);

      let amount = 0;
      console.log('checking if is preflop');
      if (isPreFlop(gameState)) {
        console.log('checked preflop');
        amount = handlePreflop(gameState);
      }

      console.log('made to bet call');
      bet(amount || 0);
    } catch (e) {
      console.log('XXXXXXXXXXXXXXXXXXXX EVERYTHING BROKETH!!!! FIX ASAP!!!! XXXXXXXXXXXXXXXXXXXXXXXXXXX');
      bet(0);
    }
  }

  static showdown(gameState) {
    console.log('showdown gameState', gameState);
  }
}

module.exports = Player;
