function getPlayer(gameState) {
  return gameState.players.find(el => el.hole_cards);
}

function isPairCards(gameState) {
    const player = getPlayer(gameState);
    return player.hole_cards[0] === player.hole_cards[1];
}

function hasAceInHand(gameState) {
  return gameState.community_cards.some(el => el.rank === 'A');
}

function handlePreflop (gameState) {
  const player = getPlayer(gameState);
  console.log('player', player);

  if (isPairCards(gameState)) {
    return player.stack;
  } else if (hasAceInHand(gameState)) {
    return gameState.current_buy_in - gameState.players[gameState.in_action][gameState.bet] + (gameState.small_blind * 6);
  } else {
    return gameState.current_buy_in - gameState.players[gameState.in_action][gameState.bet] + (gameState.small_blind * 4);
  }
}

module.exports = {
  handlePreflop,
  getPlayer,
}
