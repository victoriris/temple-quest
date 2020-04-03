import { getNeighborMatches } from './CheckWin';


function countWinMoves(pieces) {
    let winMovesCount = 0;

    for (const piece of pieces) {

        if (piece.location) {
            const neighborMatches = getNeighborMatches(pieces, piece);
            // Sum all the matches of piece directions
            const matchCount = Object.values(neighborMatches).reduce((acc, direction) => {
                // Get the max matched details on direction
                let sum = 0;
                Object.values(direction).forEach(value => {
                    sum += value;
                })
                return acc + sum;
            }, 0);
            winMovesCount += matchCount;
        }

    }

    return winMovesCount;
}

export { countWinMoves };