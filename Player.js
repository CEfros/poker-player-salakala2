const { handlePreflop, getPlayer } = require('./handlers/preflophandler');
const { isPreFlop } = require('./helpers/bet-request');
const IsOkayHand = require('./handlers/IsOkayBaseHand');

class Player {
  static get VERSION() {
    return 'v.1.1.0';
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

      if (IsOkayHand.isOkayHand(gameState.hole_cards[0], gameState.hole_cards[1])) {
        console.log('all in for okay hand');
        const player = getPlayer(gameState);
        amount = player.stack;
        console.log('all in for okay hand no failure');
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
