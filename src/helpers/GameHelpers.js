export function getInitialPieces () {
    let pieces = [];

    for (let i = 0; i < 16; i++) {

        // Convert to binary and add leading zeros
        const binaryStr = i.toString(2);
        const leadingZeros = "0".repeat(4 - binaryStr.length);
        const binaryVal = leadingZeros + binaryStr;
        
        // Build current piece
        const piece = {
            id: i,
            details: {
                light: parseInt(binaryVal[0]),
                tall: parseInt(binaryVal[1]),
                round: parseInt(binaryVal[2]),
                pitted: parseInt(binaryVal[3]),
            },
            owned: false,
            location: null
        };
        
        // Add to pieces list
        pieces.push(piece);
    }

    return pieces;
}