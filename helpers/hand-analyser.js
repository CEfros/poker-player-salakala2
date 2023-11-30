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
            return true;
        }
    }

    return false;
}

function hasTwoPair(holeCards) {
    const cardRanks = holeCards.map(card => card.rank);

    // Count the occurrences of each rank
    const rankCounts = {};
    for (const rank of cardRanks) {
        rankCounts[rank] = (rankCounts[rank] || 0) + 1;
    }

    // Check for two pairs
    const pairCount = Object.values(rankCounts).filter(count => count === 2).length;
    return pairCount === 2;
}

function hasTriple(holeCards) {
    const cardRanks = holeCards.map(card => card.rank);

    // Count the occurrences of each rank
    const rankCounts = {};
    for (const rank of cardRanks) {
        rankCounts[rank] = (rankCounts[rank] || 0) + 1;
    }

    // Check for triples
    for (const count of Object.values(rankCounts)) {
        if (count === 3) {
            return true;
        }
    }

    return false;
}

function hasStraight(holeCards) {
    const cardRanks = holeCards.map(card => card.rank);

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
}

module.exports = {
  hasPair,
  hasTriple,
  hasTwoPair,
  hasStraight,
};
