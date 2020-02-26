import { ArcRotateCamera, DirectionalLight, Mesh, Scene, SceneLoader, Vector3 } from 'babylonjs';
import 'babylonjs-loaders';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initBoard, selectBagPiece, selectBoardCell, updateBoardData } from '../actions';
import { coaster, floor, gameBoard, pieceObjects, pieceThatGoesInHole, slab, cellCords } from '../objects';
import BabylonScene from './BabylonScene';


function initializeScene (canvas, engine) {
    engine.displayLoadingUI();
    var scene = new Scene(engine);

    // This creates and positions a free camera (non-mesh)
    const camera = new ArcRotateCamera("camera1", 0, 0, 35, new Vector3(30, 0, 0), scene);
    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    scene.activeCamera.panningSensibility = 0;
    camera.lowerBetaLimit = 0.5;
    camera.upperBetaLimit = (Math.PI / 2) * 0.99;
    camera.upperRadiusLimit = 50;
    camera.lowerRadiusLimit = 20;
    
    //near left
    var light = new DirectionalLight("dir01", new Vector3(-1, -.35, 1), scene);
    light.position = new Vector3(20, 20, -20);
    light.intensity = 1.7;

    //near right
    var light2 = new DirectionalLight("dir03", new Vector3(-1, -.35, -1), scene);
    light2.position = new Vector3(20, 20, 20);
    light2.intensity = 1.7;

    //back left
    var light3 = new DirectionalLight("dir04", new Vector3(1, -.35, 1), scene);
    light3.position = new Vector3(-20, 20, -20);
    light3.intensity = 1.7;
    
    //back right
    var light4 = new DirectionalLight("dir02", new Vector3(1, -.35, -1), scene);
    light4.position = new Vector3(-20, 20, 20);
    light4.intensity = 1.7;

    var ground = Mesh.CreateGround("ground", 17, 17, 2, scene);
    ground.position.y = 0.17;

    return scene;
}


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
        var scene = initializeScene(canvas, engine);

        //Board Pieces         
        var room;
        var slabForPieces; 
        var pieceHolder;
        var boardObj = {};
        var circlePieces = [];
        var circleBoards = [];
        var selectedPiece;

        for (const position in cellCords) {
            const cord = cellCords[position];
            circleBoards[position] = new Vector3(cord[0], cord[1], cord[2]);
        }

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
                boardObj[key] = newMeshes[0];
                boardObj[key].scaling = pieceScaling;
                boardObj[key].position = new Vector3(loc[0], loc[1], loc[2]);
            } );
        }

        SceneLoader.ImportMesh("",pieceThatGoesInHole, "", scene, (newMeshes, particleSystems, skeletons) =>{
            for (const hole in circleBoards) {
                if (parseInt(hole) === 0) {
                    circlePieces[0] = newMeshes[0];
                    circlePieces[0].name = "holePiece0";
                }
                else {
                    circlePieces[hole] = circlePieces[0].clone("holePiece"+hole);
                }
                circlePieces[hole].position = circleBoards[hole];
                circlePieces[hole].position.y = 0.015;
            }
        } );
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
                if(hasPieceBeenPicked) {
                    if (pickResult.hit) {
                        const meshname = pickResult.pickedMesh.name;
                        if (!meshname.includes("Cylinder.015")) return;

                        const holeid = meshname === "Cylinder.015" ? 0 : meshname.match(/holePiece(\d+)\.Cylinder/)[1];
                        const hole = circleBoards.find((val, idx) => idx === parseInt(holeid));

                        if (hole) {
                            hasPieceBeenPicked = false;
                            boardObj[selectedPiece].position = hole;
                            const column = parseInt(holeid) % 4;
                            const row = Math.floor(parseInt(holeid) / 4);
                            this.handleCellClick(row, column)
                        }
                    }
                }
                // Pieces bag item selection
                else {
                    if (pickResult.hit) {
                        for (let [key, value] of Object.entries(boardObj)) {
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
    const { pieces, isUserTurn, selectedPieceId, isOnlineMode } = board;
    return { pieces, isUserTurn, selectedPieceId, isOnlineMode  };
};

export default connect(mapStateToProps, {
    initBoard, selectBagPiece, selectBoardCell, updateBoardData, 
})(Viewer);