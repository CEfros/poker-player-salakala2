export function getPlayer(gameState) {
  return gameState.players.find(el => el.hole_cards);
}

export function isPairCards(gameState) {
    const player = getPlayer(gameState);
    return player.hole_cards[0] === player.hole_cards[1];
}

function handlePreflop (gameState) {
  const player = getPlayer(gameState);
  console.log('player', player);

  if (isPairCards(gameState)) {
    return player.stack;
  }
}

module.exports = {
  handlePreflop,
}
