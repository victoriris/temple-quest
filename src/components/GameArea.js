import { SceneLoader, Vector3 } from 'babylonjs';
import 'babylonjs-loaders';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initBoard, selectBagPiece, selectBoardCell, updateBoardData } from '../actions';
import { coaster, floor, gameBoard, pieceObjects, slab, cellCords } from '../objects';
import BabylonScene from './BabylonScene';
import { getGameScene } from '../helpers';
import { importCellMeshes } from '../helpers/importCellMeshes';


class Viewer extends Component {

    componentWillMount() {
        this.props.initBoard();
    }

    handleOnlineChange () {
        const { isOnlineMode } = this.props;
        this.props.updateBoardData('isOnlineMode', !isOnlineMode);
    }

    handlePieceClick (pieceId) {
        this.props.selectBagPiece(pieceId);
    }

    handleCellClick (row, column) {
        this.props.selectBoardCell(row, column);
    }

    isUsedLocation(row, column) {
        return !!this.props.pieces.find((piece) => {
            if (!piece.location) return false;
            const { location } = piece;
            return location.row === row && location.column === column
        });
    }
    
    onSceneMount = (e) => {
        const { canvas, engine } = e;
        var scene = getGameScene(canvas, engine);

        //Board Pieces         
        var room;
        var slabForPieces; 
        var pieceHolder;
        var pieceMeshes = {};
        var circlePieces = [];
        var selectedPiece;
        var coasterLocation = new Vector3(0, 0.069, -13);

        // Set gameboard and slab
        SceneLoader.ImportMesh("",gameBoard, "", scene);
        SceneLoader.ImportMesh("",slab, "", scene, (newMeshes, particleSystems, skeletons) =>{
            slabForPieces = newMeshes[0];
            slabForPieces.position = new Vector3(0, 0.069, 15);
        } );

        // Set pieces
        const pieceScaling = new Vector3(0.6, 0.6, 0.6);
        for (const [key, piece] of Object.entries(pieceObjects)) {
            const loc = piece.loc;
            SceneLoader.ImportMesh("",piece.obj, "", scene, (newMeshes, particleSystems, skeletons) =>{
                pieceMeshes[key] = newMeshes[0];
                pieceMeshes[key].scaling = pieceScaling;
                pieceMeshes[key].position = new Vector3(loc[0], loc[1], loc[2]);
            } );
        }
        importCellMeshes(scene, circlePieces);

        SceneLoader.ImportMesh("", coaster, "", scene, (newMeshes, particleSystems, skeletons) => {
            pieceHolder = newMeshes[0];
            pieceHolder.position = new Vector3(0, 0.069, -13);
        });
        SceneLoader.ImportMesh("",floor, "", scene, (newMeshes, particleSystems, skeletons) =>{
            room = newMeshes[0];
            room.position = new Vector3(0,0,0);
        });


        //Point and click logic
        setTimeout(() => {
            var hasPieceBeenPicked = false;

            scene.onPointerDown = (evt, pickResult) => {
                // Cell item selection
                console.log('picked: ', hasPieceBeenPicked);
                if(hasPieceBeenPicked) {
                    if (pickResult.hit) {
                        const meshname = pickResult.pickedMesh.name;
                        if (!meshname.includes("Cylinder.015")) return;

                        const holeid = meshname === "Cylinder.015" ? 0 : meshname.match(/holePiece(\d+)\.Cylinder/)[1];
                        const hole = cellCords.find((val, idx) => idx === parseInt(holeid));

                        if (hole) {
                            hasPieceBeenPicked = false;
                            pieceMeshes[selectedPiece].position = new Vector3 (hole[0], hole[1], hole[2]);
                            const column = parseInt(holeid) % 4;
                            const row = Math.floor(parseInt(holeid) / 4);
                            this.handleCellClick(row, column)
                        }
                    }
                }
                // Pieces bag item selection
                else {
                    if (pickResult.hit) {
                        for (let [key, value] of Object.entries(pieceMeshes)) {
                            if (pickResult.pickedMesh.name.includes(key)) {
                                selectedPiece = key;
                                value.position = coasterLocation;
                                hasPieceBeenPicked = true;
                                const pieceId = pieceObjects[key].id;
                                this.handlePieceClick(pieceId)
                                break;
                            }
                        }
                    }
                }
            };
            
        engine.hideLoadingUI();
        }, 3000);

        //heck if I know
       engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });
    }

    render() {    
        return (
            <BabylonScene onSceneMount={this.onSceneMount} />
        )
    }
    
}

const mapStateToProps = ({ board, network }) => {
    const { pieces, isUserTurn, selectedPieceId, isOnlineMode, hasPieceBeenPicked } = board;
    return { pieces, isUserTurn, selectedPieceId, isOnlineMode, hasPieceBeenPicked };
};

export default connect(mapStateToProps, {
    initBoard, selectBagPiece, selectBoardCell, updateBoardData
})(Viewer);



