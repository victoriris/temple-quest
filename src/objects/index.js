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