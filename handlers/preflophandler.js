const IsOkayHand = require('./IsOkayBaseHand');
const IsNeutralHand = require('./IsNeutralHand');

function getPlayer(gameState) {
  return gameState.players.find(el => el.hole_cards);
}

function isPairCards(gameState) {
    const player = getPlayer(gameState);
    return player.hole_cards[0].rank === player.hole_cards[1].rank;
}

function handlePreflop (gameState) {
  const player = getPlayer(gameState);

  if (isPairCards(gameState)) {
    const fakeCall = Math.random() > 0.5;

    if (fakeCall) {
      return gameState.current_buy_in;
    }

    return player.stack;
  }

  if (IsOkayHand.isOkayHand(player.hole_cards[0], player.hole_cards[1])) {
    return gameState.current_buy_in;
  }

  if (!isBetHigherInSBs(gameState, 6) && IsNeutralHand.IsNeutralHand(player.hole_cards[0], player.hole_cards[1])) {
    return gameState.current_buy_in;
  }

  return gameState.current_buy_in - player.bet + (gameState.small_blind * 4);
}

function isBetHigherInSBs(gameState, smallBlinds) {
  if (gameState.current_buy_in > gameState.small_blind * smallBlinds) {
    return true;
  }

  return false;
}

module.exports = {
  handlePreflop,
  getPlayer,
}
