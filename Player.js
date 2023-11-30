const { handlePreflop, getPlayer } = require('./handlers/preflophandler');
const IsOkayHand = require('./handlers/IsOkayBaseHand');

const { handleFlop } = require('./handlers/flophandler');
const { isPreFlop, isFlop, isTurn, isRiver } = require('./helpers/bet-request');

class Player {
  static get VERSION() {
    return 'v.1.5.0';
  }

  static betRequest(gameState, bet) {
    try {
      console.log('gamestate Sala1: ', gameState);

      const player = getPlayer(gameState);

      if (
        isPreFlop(gameState) &&
        !IsOkayHand.isOkayHand(player.hole_cards[0], player.hole_cards[1])
      ) {
        console.log('checking or folding for non good hand');
        bet(0);
        return;
      }

      let amount = 0;
      console.log('checking if is preflop');

      if (isPreFlop(gameState)) {
        console.log('checked preflop');
        amount = handlePreflop(gameState);
        console.log('checked preflop success, amount:', amount);
      } else if (isFlop(gameState)) {
        console.log('check flop');
        amount = handleFlop(gameState);
        console.log('checked flop success, amount:', amount);
      } else if (isTurn(gameState)) {
        amount = handleFlop(gameState);
      } else if (isRiver(gameState)) {
        amount = handleFlop(gameState);
      }

      // check if amount is not a number
      if (isNaN(amount)) {
        console.log('tried to bet nan');
        amount = 0;
      }

      // check if amount is negative
      if (amount < 0) {
        console.log('tried to bet negative bet', amount);
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
