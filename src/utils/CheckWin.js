function CheckWin (pieces, pieceId) {

    // Find piece, exit otherwise
    const piece = pieces.find(({ id }) => id === parseInt(pieceId));
    if (!piece) return;

    // Get located pieces with same row OR column
    const directions = getNeighborMatches(pieces, piece);

    // Check if some value in some direction totally matched
    const hasWon = Object.values(directions).some(direction => {
        return Object.values(direction).some(value => value >= 3);   
    });

    return hasWon;
}

function getNeighborMatches(pieces, piece) {
    var neighbors = [];

    // Not matches if is not placed
    if (!piece.location) return 0;

    pieces.forEach((p) => {
        if (!p.location || p.id === piece.id) return false;
        const sameRow = p.location.row === piece.location.row;
        const sameColumn = p.location.column === piece.location.column;
        const diagonalValue = getDiagonalValue(piece, p);

        if (sameRow) neighbors.push({ ...p, match: 'row' });
        if (sameColumn) neighbors.push({ ...p, match: 'column' });
        if (diagonalValue === 1) {
            neighbors.push({ ...p, match: 'diagonal_up' });
        }
        if (diagonalValue === -1) {
            neighbors.push({ ...p, match: 'diagonal_down' });
        }
    });

    // Accumulate similarities per direction
    const directions = neighbors.reduce((acc, item) => {
        // For each characteristic
        Object.keys(item.details).forEach((key) => {
            // Sum its boolean value to the matched row or column
            const matches = item.details[key] === piece.details[key];
            acc[item.match][key] = (acc[item.match][key] || 0) + matches;
        });
        return acc;
    }, { row: {}, column: {}, diagonal_up: {}, diagonal_down: {} });
    
    return directions;
}

// Gets the diagonal type (+, -)
function getDiagonalValue (rootPiece, comparedPiece) {
    const colDiff = comparedPiece.location.column - rootPiece.location.column;
    const rowDif = comparedPiece.location.row - rootPiece.location.row;
    const diff = Math.abs(colDiff) !== Math.abs(rowDif);
    if (rowDif === 0 || diff ) return 0;
    return colDiff/rowDif;
};


export {
    CheckWin, getNeighborMatches
};