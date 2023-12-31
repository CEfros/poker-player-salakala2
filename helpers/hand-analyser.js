function hasPair(holeCards) {
    const cardRanks = holeCards.map(card => card.rank);

    // Count the occurrences of each rank
    const rankCounts = {};
    for (const rank of cardRanks) {
        rankCounts[rank] = (rankCounts[rank] || 0) + 1;
    }

    // Check for pairs
    for (const count of Object.values(rankCounts)) {
        if (count === 2) {
            console.log('we have a pair!');
            return true;
        }
    }

    return false;
}

function hasTwoPair(holeCards) {
    console.log('checking if has two pairs');
    const cardRanks = holeCards.map(card => card.rank);
    console.log('cardRanks: ', cardRanks);

    // Count the occurrences of each rank
    const rankCounts = {};
    for (const rank of cardRanks) {
        rankCounts[rank] = (rankCounts[rank] || 0) + 1;
    }

    // Check for two pairs
    const pairCount = Object.values(rankCounts).filter(count => count === 2).length;
    if (pairCount === 2) {
      console.log('we have two pairs!');
      return true;
    }
    return false;
}

function hasTriple(holeCards) {
    console.log('checking if has triple');
    const cardRanks = holeCards.map(card => card.rank);
    console.log('cardRanks: ', cardRanks);

    // Count the occurrences of each rank
    const rankCounts = {};
    for (const rank of cardRanks) {
        rankCounts[rank] = (rankCounts[rank] || 0) + 1;
    }

    // Check for triples
    for (const count of Object.values(rankCounts)) {
        if (count === 3) {
            console.log('we have a triple!');
            return true;
        }
    }

    return false;
}

function hasStraight(holeCards) {
    console.log('checking if has straight');
    const cardRanks = holeCards.map(card => card.rank);
    console.log('cardRanks: ', cardRanks);

    // Convert card ranks to numeric values
    const numericRanks = cardRanks.map(rank => {
        if (rank === "J") return 11;
        if (rank === "Q") return 12;
        if (rank === "K") return 13;
        if (rank === "A") return 14;
        return parseInt(rank, 10);
    });

    const sortedRanks = numericRanks.sort((a, b) => a - b);

    // Check for a straight
    for (let i = 0; i < sortedRanks.length - 1; i++) {
        if (sortedRanks[i + 1] - sortedRanks[i] !== 1) {
            return false;
        }
    }
    console.log('we have a straight!');
    return true;
}

function hasFourOfAKind(holeCards) {
    const cardRanks = holeCards.map(card => card.rank);

    // Count the occurrences of each rank
    const rankCounts = {};
    for (const rank of cardRanks) {
        rankCounts[rank] = (rankCounts[rank] || 0) + 1;
    }

    // Check for a four of a kind
    return Object.values(rankCounts).some(count => count >= 4);
}

function hasFlush(holeCards) {
    const cardSuits = holeCards.map(card => card.suit);

    // Count the occurrences of each suit
    const suitCounts = {};
    for (const suit of cardSuits) {
        suitCounts[suit] = (suitCounts[suit] || 0) + 1;
    }

    // Check for a flush (all cards having the same suit)
    return Object.values(suitCounts).some(count => count >= 5);
}

function hasFullHouse(holeCards) {
    return hasPair(holeCards) && hasTriple(holeCards);
}

function hasStrongestPair(holeCards, communityCards) {
    const allCards = [...holeCards, ...communityCards];
    const cardRanks = allCards.map(card => card.rank);

    // Count the occurrences of each rank
    const rankCounts = {};
    for (const rank of cardRanks) {
        rankCounts[rank] = (rankCounts[rank] || 0) + 1;
    }

    // Find the highest-ranked pair
    let strongestPairRank = null;
    for (const rank in rankCounts) {
        if (rankCounts[rank] === 2 && (!strongestPairRank || rank > strongestPairRank)) {
            strongestPairRank = rank;
        }
    }

    // Check if you have the strongest pair
    const yourPairRank = holeCards.some(card => card.rank === strongestPairRank);
    return yourPairRank;
}

module.exports = {
  hasPair,
  hasTriple,
  hasTwoPair,
  hasStraight,
  hasFlush,
  hasFourOfAKind,
  hasFullHouse,
  hasStrongestPair,
};
