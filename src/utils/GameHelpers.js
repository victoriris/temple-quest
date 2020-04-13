
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


export const pieceObjects = [
    { id: 0,    obj: 'shortDarkFlatSquare',      loc: [-12.5, 0.15, 13]}, 
    { id: 1,    obj: 'shortDarkHoleSquare',      loc: [-9, 0.15, 13]}, 
    { id: 2,    obj: 'shortDarkFlatCylinder',    loc: [-5.5, 0.15, 13]}, 
    { id: 3,    obj: 'shortDarkHoleCylinder',    loc: [-2, 0.15, 13]},
    { id: 4,    obj: 'tallDarkFlatSquare',       loc: [2, 0.15, 13]}, 
    { id: 5,    obj: 'tallDarkHoleSquare',       loc: [5.5, 0.15, 13]}, 
    { id: 6,    obj: 'tallDarkFlatCylinder',     loc: [9, 0.15, 13]}, 
    { id: 7,    obj: 'tallDarkHoleCylinder',     loc: [12.5, 0.15, 13]},
    { id: 8,    obj: 'shortLightFlatSquare',     loc: [-12.5, 0.15, 17]}, 
    { id: 9,    obj: 'shortLightHoleSquare',     loc: [-9, 0.15, 17]}, 
    { id: 10,   obj: 'shortLightFlatCylinder',   loc: [-5.5, 0.15, 17]}, 
    { id: 11,   obj: 'shortLightHoleCylinder',   loc: [-2, 0.15, 17]},
    { id: 12,   obj: 'tallLightFlatSquare',      loc: [2, 0.15, 17]}, 
    { id: 13,   obj: 'tallLightHoleSquare',      loc: [5.5, 0.15, 17]}, 
    { id: 14,   obj: 'tallLightFlatCylinder',    loc: [9, 0.15, 17]}, 
    { id: 15,   obj: 'tallLightHoleCylinder',    loc: [12.5, 0.15, 17]},
];

export const cellCords = [
    [-7.5, 0.15, -7.5], [-7.5, 0.15, -2.5], [-7.5, 0.15, 2.5], [-7.5, 0.15, 7.5],
    [-2.5, 0.15, -7.5], [-2.5, 0.15, -2.5], [-2.5, 0.15, 2.5], [-2.5, 0.15, 7.5],
    [2.5, 0.15, -7.5], [2.5, 0.15, -2.5], [2.5, 0.15, 2.5], [2.5, 0.15, 7.5],
    [7.5, 0.15, -7.5], [7.5, 0.15, -2.5], [7.5, 0.15, 2.5], [7.5, 0.15, 7.5]
];

export function getCellPosition(row, column) {
    const cellId = column + (row * 4);
    const cell = cellCords.find((cords, idx) => idx === cellId);
    const [x, y, z] = cell;
    return {x, y, z};
}