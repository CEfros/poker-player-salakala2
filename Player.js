const { handlePreflop, getPlayer } = require('./handlers/preflophandler');
const IsOkayHand = require('./handlers/IsOkayBaseHand');

const { handleFlop } = require('./handlers/flophandler');
const { isPreFlop, isFlop } = require('./helpers/bet-request');

class Player {
  static get VERSION() {
    return 'v.1.2.0';
  }

  static betRequest(gameState, bet) {
    try {
      console.log('gamestate Sala1: ', gameState);

      let amount = 0;
      console.log('checking if is preflop');
      if (isPreFlop(gameState)) {
        console.log('checked preflop');
        amount = handlePreflop(gameState);
      } else if (isFlop(gameState)) {
        console.log('check flop');
        amount = handleFlop(gameState);
      }

      const player = getPlayer(gameState);
      if (IsOkayHand.isOkayHand(player.hole_cards[0], player.hole_cards[1])) {
        console.log('all in for okay hand');
        amount = player.stack;
        console.log('all in for okay hand no failure');
      }


      // check if amount is not a number
      if (isNaN(amount)) {
        console.log('tried to bet nan');
        amount = 0;
      }

      console.log('made to bet call: ', amount);

      bet(amount || 0);
    } catch (e) {
      console.trace('XXXXXXXXXXXXXXXXXXXX EVERYTHING BROKETH!!!! FIX ASAP!!!! XXXXXXXXXXXXXXXXXXXXXXXXXXX', e);
      bet(0);
    }
  }

  static showdown(gameState) {
    console.log('showdown gameState', gameState);
  }
}

module.exports = Player;
