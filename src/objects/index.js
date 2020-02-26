import { default as tLFS} from '../objects/tallLightFlatSquare.glb';
import { default as tLHC} from '../objects/tallLightHoleCylinder.glb';
import { default as sDFC} from '../objects/shortDarkFlatCylinder.glb';
import { default as sDFS} from '../objects/shortDarkFlatSquare.glb';
import { default as sDHC} from '../objects/shortDarkHoleCylinder.glb';
import { default as sDHS } from '../objects/shortDarkHoleSquare.glb';
import { default as sLFC } from '../objects/shortLightFlatCylinder.glb';
import { default as sLFS } from '../objects/shortLightFlatSquare.glb';
import { default as sLHC } from '../objects/shortLightHoleCylinder.glb';
import { default as sLHS } from '../objects/shortLightHoleSquare.glb';
import { default as tDFC } from '../objects/tallDarkFlatCylinder.glb';
import { default as tDFS } from '../objects/tallDarkFlatSquare.glb';
import { default as tDHC } from '../objects/tallDarkHoleCylinder.glb';
import { default as tDHS } from '../objects/tallDarkHoleSquare.glb';
import { default as tLFC } from '../objects/tallLightFlatCylinder.glb';
import { default as tLHS } from '../objects/tallLightHoleSquare.glb';

export { default as floor} from '../objects/floor.glb';
export { default as slab} from '../objects/slabForPieces.glb';
export { default as pieceThatGoesInHole} from '../objects/pieceThatGoesInHole.glb';
export { default as gameBoard } from '../objects/gameBoard.glb';
export { default as coaster } from '../objects/coaster.glb';

export const pieceObjects = {
    shortDarkFlatSquare:    { id: 0,    obj: sDFS, loc: [-12.5, 0.15, 13]}, 
    shortDarkHoleSquare:    { id: 1,    obj: sDHS, loc: [-9, 0.15, 13]}, 
    shortDarkFlatCylinder:  { id: 2,    obj: sDFC, loc: [-5.5, 0.15, 13]}, 
    shortDarkHoleCylinder:  { id: 3,    obj: sDHC, loc: [-2, 0.15, 13]},
    tallDarkFlatSquare:     { id: 4,    obj: tDFS, loc: [2, 0.15, 13]}, 
    tallDarkHoleSquare:     { id: 5,    obj: tDHS, loc: [5.5, 0.15, 13]}, 
    tallDarkFlatCylinder:   { id: 6,    obj: tDFC, loc: [9, 0.15, 13]}, 
    tallDarkHoleCylinder:   { id: 7,    obj: tDHC, loc: [12.5, 0.15, 13]},
    shortLightFlatSquare:   { id: 8,    obj: sLFS, loc: [-12.5, 0.15, 17]}, 
    shortLightHoleSquare:   { id: 9,    obj: sLHS, loc: [-9, 0.15, 17]}, 
    shortLightFlatCylinder: { id: 10,   obj: sLFC, loc: [-5.5, 0.15, 17]}, 
    shortLightHoleCylinder: { id: 11,   obj: sLHC, loc: [-2, 0.15, 17]},
    tallLightFlatSquare:    { id: 12,   obj: tLFS, loc: [2, 0.15, 17]}, 
    tallLightHoleSquare:    { id: 13,   obj: tLHS, loc: [5.5, 0.15, 17]}, 
    tallLightFlatCylinder:  { id: 14,   obj: tLFC, loc: [9, 0.15, 17]}, 
    tallLightHoleCylinder:  { id: 15,   obj: tLHC, loc: [12.5, 0.15, 17]},
};

export const cellCords = [
    [-7.5, 0.15, -7.5], [-7.5, 0.15, -2.5], [-7.5, 0.15, 2.5], [-7.5, 0.15, 7.5],
    [-2.5, 0.15, -7.5], [-2.5, 0.15, -2.5], [-2.5, 0.15, 2.5], [-2.5, 0.15, 7.5],
    [2.5, 0.15, -7.5], [2.5, 0.15, -2.5], [2.5, 0.15, 2.5], [2.5, 0.15, 7.5],
    [7.5, 0.15, -7.5], [7.5, 0.15, -2.5], [7.5, 0.15, 2.5], [7.5, 0.15, 7.5]
];