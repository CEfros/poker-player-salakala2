const { handlePreflop, getPlayer } = require('./handlers/preflophandler');
const IsOkayHand = require('./handlers/IsOkayBaseHand');
const IsNeutralHand = require('./handlers/IsConnectedHand');

const { handleFlop } = require('./handlers/flophandler');
const { isPreFlop, isFlop, isTurn, isRiver } = require('./helpers/bet-request');
const timers = require("timers");

class Player {
  static get VERSION() {
    return 'v.1.7.0';
  }

  static betRequest(gameState, bet) {
    try {
      console.time('TIMER: whole resptime');
      console.log('gamestate Sala1: ', gameState);

      const player = getPlayer(gameState);

      console.time('TIMER: isOkayHand');
      if (
        isPreFlop(gameState) &&
        !IsOkayHand.isOkayHand(player.hole_cards[0], player.hole_cards[1]) ||
        !IsNeutralHand.isNeutralHand(player.hole_cards[0], player.hole_cards[1])
      ) {
        console.log('checking or folding for non good hand');

        console.timeEnd('TIMER: isOkayHand');
        bet(0);
        return;
      }
      console.timeEnd('TIMER: isOkayHand');

      let amount = 0;
      console.log('checking if is preflop');

      if (isPreFlop(gameState)) {
        console.time('TIMER: handlePreflop');
        console.log('checked preflop');
        amount = handlePreflop(gameState);
        console.log('checked preflop success, amount:', amount);
        console.timeEnd('TIMER: handlePreflop');
      } else if (isFlop(gameState)) {
        console.time('TIMER: isFlop handleFlop');
        console.log('check flop');
        amount = handleFlop(gameState);
        console.log('checked flop success, amount:', amount);
        console.timeEnd('TIMER: isFlop handleFlop');
      } else if (isTurn(gameState)) {
        console.time('TIMER: isTurn handleFlop');
        amount = handleFlop(gameState);
        console.timeEnd('TIMER: isTurn handleFlop');
      } else if (isRiver(gameState)) {
        console.time('TIMER: isRiver handleFlop');
        amount = handleFlop(gameState);
        console.timeEnd('TIMER: isRiver handleFlop');
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

      console.timeEnd('TIMER: whole resptime');

      bet(amount || 0);
    } catch (e) {
      console.trace('XXXXXXXXXXXXXXXXXXXX EVERYTHING BROKETH!!!! FIX ASAP!!!! XXXXXXXXXXXXXXXXXXXXXXXXXXX', e);

      console.timeEnd('TIMER: whole resptime');
      bet(0);
    }
  }

  static showdown(gameState) {
    console.log('showdown gameState', gameState);
  }
}

module.exports = Player;
