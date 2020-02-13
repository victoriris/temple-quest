export const isWinMove = (pieces, pieceId) => {

    // Find piece, exit otherwise
    const piece = pieces.find(({ id }) => id === parseInt(pieceId));
    if (!piece || !piece.location) return false;
    // Check if a piece is a valid diagonal compared to a root piece
    const isDiagonal = (rootPiece, comparedPiece) => {
        const colDiff = (comparedPiece.location.column - rootPiece.location.column);
        const rowDif = (comparedPiece.location.row - rootPiece.location.row);
        const result = (colDiff / rowDif) || 1;
        return result === 1 || result === -1;
    };

    // Get located pieces with same row OR column
    const neighbors = pieces.filter((p) => {
        if (!p.location) return false;
        return (
            p.location.row === piece.location.row 
            || p.location.column === piece.location.column
            || isDiagonal(piece, p)
        );
    });


    // Accumulate similarities per direction
    const directions = neighbors.reduce((acc, item) => {

        // For each characteristic
        Object.keys(item.details).forEach((key) => {

            // Sum its boolean value to the matched row or column
            const matches = item.details[key] === piece.details[key];
            if (item.location.row === piece.location.row) {
                acc['row'][key] = (acc['row'][key] || 0) + matches;
            }
            if (item.location.column === piece.location.column) {
                acc['column'][key] = (acc['column'][key] || 0) + matches;
            }
            if(isDiagonal(piece, item)) {
                acc['diagonal'][key] = (acc['diagonal'][key] || 0) + matches;
            }
            
        });

        return acc;
    }, {row: {}, column: {}, diagonal: {}});

    // Check if some value in some direction totally matched
    const hasWon = Object.values(directions).some(direction => {
        return Object.values(direction).some(value => value === 4);   
    });

    return hasWon;
    
};