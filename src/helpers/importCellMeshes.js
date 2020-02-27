import { SceneLoader, Vector3 } from 'babylonjs';
import { pieceThatGoesInHole, cellCords } from '../objects';


export function importCellMeshes(scene, circlePieces) {
    SceneLoader.ImportMesh("", pieceThatGoesInHole, "", scene, (newMeshes, particleSystems, skeletons) => {
        for (const position in cellCords) {
            if (parseInt(position) === 0) {
                circlePieces[0] = newMeshes[0];
                circlePieces[0].name = "holePiece0";
            }
            else {
                circlePieces[position] = circlePieces[0].clone("holePiece" + position);
            }
            const cord = cellCords[position];
            circlePieces[position].position = new Vector3(cord[0], cord[1], cord[2]);
            circlePieces[position].position.y = 0.015;
        }
    });
}
