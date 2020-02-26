import React, { Component } from 'react';
import { Scene, SceneLoader, Vector3, ArcRotateCamera, DirectionalLight, Mesh } from 'babylonjs';
import BabylonScene from './BabylonScene';
import 'babylonjs-loaders';
import { tLFS, tLHC, pieceThatGoesInHole, floor, slab, sDFC, sDFS } from '../objects';
import { sDHC, sDHS, sLFC, sLFS, sLHC, sLHS, tDFC, tDFS, tDHC, tDHS, tLFC, tLHS, gameBoard, coaster  } from '../objects';
import { initBoard, selectBagPiece, selectBoardCell, updateBoardData } from '../actions';
import { connect } from 'react-redux';

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
        var shortDarkFlatCylinder, shortDarkFlatSquare, shortDarkHoleCylinder, shortDarkHoleSquare, 
        shortLightFlatCylinder, shortLightFlatSquare, shortLightHoleSquare, shortLightHoleCylinder, 
        tallDarkFlatCylinder, tallDarkFlatSquare, tallDarkHoleCylinder, tallDarkHoleSquare, 
        tallLightFlatCylinder, tallLightFlatSquare, tallLightHoleSquare, tallLightHoleCylinder;
        
        var room;
        var slabForPieces; 
        var pieceHolder;
        var boardObj = {
            shortDarkFlatCylinder, shortDarkFlatSquare, shortDarkHoleCylinder, shortDarkHoleSquare, 
            shortLightFlatCylinder, shortLightFlatSquare, shortLightHoleSquare, shortLightHoleCylinder, 
            tallDarkFlatCylinder, tallDarkFlatSquare, tallDarkHoleCylinder, tallDarkHoleSquare, 
            tallLightFlatCylinder, tallLightFlatSquare, tallLightHoleSquare, tallLightHoleCylinder
        };
        var circlePieces = [];
        var circleBoards = [];
        var selectedPiece;

        
        //Board Positions
        let positionCords = [
            [-7.5, 0.15, -7.5], [-7.5, 0.15, -2.5], [-7.5, 0.15, 2.5], [-7.5, 0.15, 7.5],
            [-2.5, 0.15, -7.5], [-2.5, 0.15, -2.5], [-2.5, 0.15, 2.5], [-2.5, 0.15, 7.5],
            [2.5, 0.15, -7.5], [2.5, 0.15, -2.5], [2.5, 0.15, 2.5], [2.5, 0.15, 7.5],
            [7.5, 0.15, -7.5], [7.5, 0.15, -2.5], [7.5, 0.15, 2.5], [7.5, 0.15, 7.5]
        ];

        for (const position in positionCords) {
            const cord = positionCords[position];
            circleBoards[position] = new Vector3(cord[0], cord[1], cord[2]);
        }

        var coasterLocation = new Vector3(0, 0.069, -13);

         //importing the board object    empty   objectImportName  empty scene (paramsForAnimation)
        SceneLoader.ImportMesh("",gameBoard, "", scene);

        SceneLoader.ImportMesh("",slab, "", scene, (newMeshes, particleSystems, skeletons) =>{
            slabForPieces = newMeshes[0];
            slabForPieces.position = new Vector3(0, 0.069, 15);
        } );

        SceneLoader.ImportMesh("",sDFC, "", scene, (newMeshes, particleSystems, skeletons) =>{
            boardObj.shortDarkFlatCylinder = newMeshes[0];
            boardObj.shortDarkFlatCylinder.scaling = new Vector3(0.6, 0.6, 0.6);
            boardObj.shortDarkFlatCylinder.position = new Vector3(-12.5, 0.15, 13);
        } );

        SceneLoader.ImportMesh("",sDFS, "", scene, (newMeshes, particleSystems, skeletons) =>{
            boardObj. shortDarkFlatSquare = newMeshes[0];
             boardObj.shortDarkFlatSquare.scaling = new Vector3(0.6, 0.6, 0.6);
             boardObj.shortDarkFlatSquare.position = new Vector3(-9, 0.15, 13);
        } );

        SceneLoader.ImportMesh("",sDHC, "", scene, (newMeshes, particleSystems, skeletons) =>{
             boardObj.shortDarkHoleCylinder = newMeshes[0];
             boardObj.shortDarkHoleCylinder.scaling = new Vector3(0.6, 0.6, 0.6);
             boardObj.shortDarkHoleCylinder.position = new Vector3(-5.5, 0.15, 13);
        } );

        SceneLoader.ImportMesh("",sDHS, "", scene, (newMeshes, particleSystems, skeletons) =>{
             boardObj.shortDarkHoleSquare = newMeshes[0];
             boardObj.shortDarkHoleSquare.scaling = new Vector3(0.6, 0.6, 0.6);
             boardObj.shortDarkHoleSquare.position = new Vector3(-2, 0.15, 13);
        } );

        SceneLoader.ImportMesh("",tDFC, "", scene, (newMeshes, particleSystems, skeletons) =>{
             boardObj.tallDarkFlatCylinder = newMeshes[0];
             boardObj.tallDarkFlatCylinder.scaling = new Vector3(0.6, 0.6, 0.6);
             boardObj.tallDarkFlatCylinder.position = new Vector3(2, 0.15, 13);
        } );

        SceneLoader.ImportMesh("",tDFS, "", scene, (newMeshes, particleSystems, skeletons) =>{
             boardObj.tallDarkFlatSquare = newMeshes[0];
             boardObj.tallDarkFlatSquare.scaling = new Vector3(0.6, 0.6, 0.6);
             boardObj.tallDarkFlatSquare.position = new Vector3(5.5, 0.15, 13);
        } );

        SceneLoader.ImportMesh("",tDHC, "", scene, (newMeshes, particleSystems, skeletons) =>{
             boardObj.tallDarkHoleCylinder = newMeshes[0];
             boardObj.tallDarkHoleCylinder.scaling = new Vector3(0.6, 0.6, 0.6);
             boardObj.tallDarkHoleCylinder.position = new Vector3(9, 0.15, 13);
        } );

        SceneLoader.ImportMesh("",tDHS, "", scene, (newMeshes, particleSystems, skeletons) =>{
             boardObj.tallDarkHoleSquare = newMeshes[0];
             boardObj.tallDarkHoleSquare.scaling = new Vector3(0.6, 0.6, 0.6);
             boardObj.tallDarkHoleSquare.position = new Vector3(12.5, 0.15, 13);
        } );

        SceneLoader.ImportMesh("",sLFC, "", scene, (newMeshes, particleSystems, skeletons) =>{
             boardObj.shortLightFlatCylinder = newMeshes[0];
             boardObj.shortLightFlatCylinder.scaling = new Vector3(0.6, 0.6, 0.6);
             boardObj.shortLightFlatCylinder.position = new Vector3(-12.5, 0.15, 17);
        } );

        SceneLoader.ImportMesh("",sLFS, "", scene, (newMeshes, particleSystems, skeletons) =>{
             boardObj.shortLightFlatSquare = newMeshes[0];
             boardObj.shortLightFlatSquare.scaling = new Vector3(0.6, 0.6, 0.6);
             boardObj.shortLightFlatSquare.position = new Vector3(-9, 0.15, 17);
        } );

        SceneLoader.ImportMesh("",sLHC, "", scene, (newMeshes, particleSystems, skeletons) =>{
             boardObj.shortLightHoleCylinder = newMeshes[0];
             boardObj.shortLightHoleCylinder.scaling = new Vector3(0.6, 0.6, 0.6);
             boardObj.shortLightHoleCylinder.position = new Vector3(-5.5, 0.15, 17);
        } );

        SceneLoader.ImportMesh("",sLHS, "", scene, (newMeshes, particleSystems, skeletons) =>{
             boardObj.shortLightHoleSquare = newMeshes[0];
             boardObj.shortLightHoleSquare.scaling = new Vector3(0.6, 0.6, 0.6);
             boardObj.shortLightHoleSquare.position = new Vector3(-2, 0.15, 17);
        } );

        SceneLoader.ImportMesh("",tLFC, "", scene, (newMeshes, particleSystems, skeletons) =>{
             boardObj.tallLightFlatCylinder = newMeshes[0];
             boardObj.tallLightFlatCylinder.scaling = new Vector3(0.6, 0.6, 0.6);
             boardObj.tallLightFlatCylinder.position = new Vector3(2, 0.15, 17);
        } );

        SceneLoader.ImportMesh("",tLFS, "", scene, (newMeshes, particleSystems, skeletons) =>{
             boardObj.tallLightFlatSquare = newMeshes[0];
             boardObj.tallLightFlatSquare.scaling = new Vector3(0.6, 0.6, 0.6);
             boardObj.tallLightFlatSquare.position = new Vector3(5.5, 0.15, 17);
        } );

        SceneLoader.ImportMesh("",tLHC, "", scene, (newMeshes, particleSystems, skeletons) =>{
             boardObj.tallLightHoleCylinder = newMeshes[0];
             boardObj.tallLightHoleCylinder.scaling = new Vector3(0.6, 0.6, 0.6);
             boardObj.tallLightHoleCylinder.position = new Vector3(9, 0.15, 17);
        } );

        SceneLoader.ImportMesh("",tLHS, "", scene, (newMeshes, particleSystems, skeletons) =>{
             boardObj.tallLightHoleSquare = newMeshes[0];
             boardObj.tallLightHoleSquare.scaling = new Vector3(0.6, 0.6, 0.6);
             boardObj.tallLightHoleSquare.position = new Vector3(12.5, 0.15, 17);
        } );

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
                            const row = Math.abs(parseInt(holeid) / 4);
                            this.handleCellClick(row, column)
                        }
                    }
                }
                // Pieces bag item selection
                else {
                    if (pickResult.hit) {
                        const pieces = Object.keys(boardObj);
                        for (let [key, value] of Object.entries(boardObj)) {
                            if (pickResult.pickedMesh.name.includes(key)) {
                                selectedPiece = key;
                                value.position = coasterLocation;
                                hasPieceBeenPicked = true;
                                const pieceId = pieces.indexOf(key);
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