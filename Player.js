const { handlePreflop, getPlayer } = require('./handlers/preflophandler');
const IsOkayHand = require('./handlers/IsOkayBaseHand');
const IsNeutralHand = require('./handlers/IsNeutralHand');

const { handleFlop } = require('./handlers/flophandler');
const { isPreFlop, isFlop, isTurn, isRiver } = require('./helpers/bet-request');

class Player {
  static get VERSION() {
    return 'ERROR: Unreachable';
  }

  static betRequest(gameState, bet) {
    try {
      console.time('TIMER: whole resptime');

      const player = getPlayer(gameState);

      if (
        isPreFlop(gameState) &&
        !IsOkayHand.isOkayHand(player.hole_cards[0], player.hole_cards[1]) ||
        !IsNeutralHand.isNeutralHand(player.hole_cards[0], player.hole_cards[1])
      ) {
        bet(0);
        return;
      }

      let amount = 0;

      if (isPreFlop(gameState)) {
        amount = handlePreflop(gameState);
      } else if (isFlop(gameState)) {
        amount = handleFlop(gameState);
      } else if (isTurn(gameState)) {
        amount = handleFlop(gameState);
      } else if (isRiver(gameState)) {
        amount = handleFlop(gameState);
      }

      console.log('made to bet call: ', amount);

      console.timeEnd('TIMER: whole resptime');

      bet(amount || 0);
    } catch (e) {
      console.trace('XXXXXXXXXXXXXXXXXXXX EVERYTHING BROKETH!!!! FIX ASAP!!!! XXXXXXXXXXXXXXXXXXXXXXXXXXX', e);

      console.timeEnd('TIMER: whole resptime');
      bet(0);
    }
  }

  static showdown(gameState) {
    // console.log('showdown gameState', gameState);
  }
}

module.exports = Player;
