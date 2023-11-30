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
      return gameState.current_buy_in - player.bet;
    }

    return player.stack;
  }

  return gameState.current_buy_in - player.bet;
}

module.exports = {
  handlePreflop,
  getPlayer,
}
