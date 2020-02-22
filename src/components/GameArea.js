import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import BabylonScene from './BabylonScene';
// eslint-disable-next-line
import * as BABYLON_LOADER from 'babylonjs-loaders';
import tLFS from '../objects/tallLightFlatSquare.glb';
import tLHC from '../objects/tallLightHoleCylinder.glb';
import gameBoard from '../objects/newGameBoard.glb';
import pieceThatGoesInHole from '../objects/pieceThatGoesInHole.glb';
import floor from '../objects/floor.glb';
import slab from '../objects/slabForPieces.glb';
import sDFC from '../objects/shortDarkFlatCylinder.glb';
import sDFS from '../objects/shortDarkFlatSquare.glb';
import sDHC from '../objects/shortDarkHoleCylinder.glb';
import sDHS from '../objects/shortDarkHoleSquare.glb';
import sLFC from '../objects/shortLightFlatCylinder.glb';
import sLFS from '../objects/shortLightFlatSquare.glb';
import sLHC from '../objects/shortLightHoleCylinder.glb';
import sLHS from '../objects/shortLightHoleSquare.glb';
import tDFC from '../objects/tallDarkFlatCylinder.glb';
import tDFS from '../objects/tallDarkFlatSquare.glb';
import tDHC from '../objects/tallDarkHoleCylinder.glb';
import tDHS from '../objects/tallDarkHoleSquare.glb';
import tLFC from '../objects/tallLightFlatCylinder.glb';
import tLHS from '../objects/tallLightHoleSquare.glb';
import coaster from '../objects/coaster.glb';
import { updateBoardData } from '../actions';
import { connect } from 'react-redux';



// eslint-disable-next-line
import { PositionGizmo, ShadowGenerator } from 'babylonjs';

class Viewer extends Component {
    
    onSceneMount = (e) => {
        const { canvas, engine } = e;
        engine.displayLoadingUI();
        var scene = new BABYLON.Scene(engine);
        // This creates and positions a free camera (non-mesh)
        const camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 35, new BABYLON.Vector3(30, 0, 0), scene);
        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
        scene.activeCamera.panningSensibility = 0;
        camera.lowerBetaLimit = 0.5;
        camera.upperBetaLimit = (Math.PI / 2) * 0.99;
        camera.upperRadiusLimit = 50;
        camera.lowerRadiusLimit = 20;
        
        var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
	    light.position = new BABYLON.Vector3(20, 40, 20);
        light.intensity = 5;
        
        //const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        //light.intensity = 7;


        //Board Pieces 
        var shortDarkFlatCylinder, shortDarkFlatSquare, shortDarkHoleCylinder, shortDarkHoleSquare, 
        shortLightFlatCylinder, shortLightFlatSquare, shortLightHoleSquare, shortLightHoleCylinder, 
        tallDarkFlatCylinder, tallDarkFlatSquare, tallDarkHoleCylinder, tallDarkHoleSquare, 
        tallLightFlatCylinder, tallLightFlatSquare, tallLightHoleSquare, tallLightHoleCylinder;
        var room;
        var slabForPieces; 
        var pieceHolder;
        var holePiece1, holePiece2, holePiece3, holePiece4, 
            holePiece5, holePiece6, holePiece7, holePiece8, 
            holePiece9, holePiece10, holePiece11, holePiece12, 
            holePiece13, holePiece14, holePiece15, holePiece16;
        var ourGameBoard;
        
        //Board Positions
        var board1 = new BABYLON.Vector3(-7.5, 0.15, -7.5);
        var board2 = new BABYLON.Vector3(-7.5, 0.15, -2.5);
        var board3 = new BABYLON.Vector3(-7.5, 0.15, 2.5);
        var board4 = new BABYLON.Vector3(-7.5, 0.15, 7.5);
        var board5 = new BABYLON.Vector3(-2.5, 0.15, -7.5);
        var board6 = new BABYLON.Vector3(-2.5, 0.15, -2.5);
        var board7 = new BABYLON.Vector3(-2.5, 0.15, 2.5);
        var board8 = new BABYLON.Vector3(-2.5, 0.15, 7.5);
        var board9 = new BABYLON.Vector3(2.5, 0.15, -7.5);
        var board10 = new BABYLON.Vector3(2.5, 0.15, -2.5);
        var board11 = new BABYLON.Vector3(2.5, 0.15, 2.5);
        var board12 = new BABYLON.Vector3(2.5, 0.15, 7.5);
        var board13 = new BABYLON.Vector3(7.5, 0.15, -7.5);
        var board14 = new BABYLON.Vector3(7.5, 0.15, -2.5);
        var board15 = new BABYLON.Vector3(7.5, 0.15, 2.5);
        var board16 = new BABYLON.Vector3(7.5, 0.15, 7.5);

        //importing the board object    empty   objectImportName  empty scene (paramsForAnimation)
        BABYLON.SceneLoader.ImportMesh("",gameBoard, "", scene, (newMeshes, particleSystems, skeletons) =>{
            ourGameBoard = newMeshes[0];
        } );

        BABYLON.SceneLoader.ImportMesh("",slab, "", scene, (newMeshes, particleSystems, skeletons) =>{
            slabForPieces = newMeshes[0];
            slabForPieces.position = new BABYLON.Vector3(0, 0.069, 15);
        } );

        BABYLON.SceneLoader.ImportMesh("",sDFC, "", scene, (newMeshes, particleSystems, skeletons) =>{
            shortDarkFlatCylinder = newMeshes[0];
            shortDarkFlatCylinder.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
            shortDarkFlatCylinder.position = new BABYLON.Vector3(-12.5, 0.15, 13);
        } );

        BABYLON.SceneLoader.ImportMesh("",sDFS, "", scene, (newMeshes, particleSystems, skeletons) =>{
            shortDarkFlatSquare = newMeshes[0];
            shortDarkFlatSquare.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
            shortDarkFlatSquare.position = new BABYLON.Vector3(-9, 0.15, 13);
        } );

        BABYLON.SceneLoader.ImportMesh("",sDHC, "", scene, (newMeshes, particleSystems, skeletons) =>{
            shortDarkHoleCylinder = newMeshes[0];
            shortDarkHoleCylinder.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
            shortDarkHoleCylinder.position = new BABYLON.Vector3(-5.5, 0.15, 13);
        } );

        BABYLON.SceneLoader.ImportMesh("",sDHS, "", scene, (newMeshes, particleSystems, skeletons) =>{
            shortDarkHoleSquare = newMeshes[0];
            shortDarkHoleSquare.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
            shortDarkHoleSquare.position = new BABYLON.Vector3(-2, 0.15, 13);
        } );

        BABYLON.SceneLoader.ImportMesh("",tDFC, "", scene, (newMeshes, particleSystems, skeletons) =>{
            tallDarkFlatCylinder = newMeshes[0];
            tallDarkFlatCylinder.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
            tallDarkFlatCylinder.position = new BABYLON.Vector3(2, 0.15, 13);
        } );

        BABYLON.SceneLoader.ImportMesh("",tDFS, "", scene, (newMeshes, particleSystems, skeletons) =>{
            tallDarkFlatSquare = newMeshes[0];
            tallDarkFlatSquare.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
            tallDarkFlatSquare.position = new BABYLON.Vector3(5.5, 0.15, 13);
        } );

        BABYLON.SceneLoader.ImportMesh("",tDHC, "", scene, (newMeshes, particleSystems, skeletons) =>{
            tallDarkHoleCylinder = newMeshes[0];
            tallDarkHoleCylinder.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
            tallDarkHoleCylinder.position = new BABYLON.Vector3(9, 0.15, 13);
        } );

        BABYLON.SceneLoader.ImportMesh("",tDHS, "", scene, (newMeshes, particleSystems, skeletons) =>{
            tallDarkHoleSquare = newMeshes[0];
            tallDarkHoleSquare.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
            tallDarkHoleSquare.position = new BABYLON.Vector3(12.5, 0.15, 13);
        } );

        BABYLON.SceneLoader.ImportMesh("",sLFC, "", scene, (newMeshes, particleSystems, skeletons) =>{
            shortLightFlatCylinder = newMeshes[0];
            shortLightFlatCylinder.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
            shortLightFlatCylinder.position = new BABYLON.Vector3(-12.5, 0.15, 17);
        } );

        BABYLON.SceneLoader.ImportMesh("",sLFS, "", scene, (newMeshes, particleSystems, skeletons) =>{
            shortLightFlatSquare = newMeshes[0];
            shortLightFlatSquare.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
            shortLightFlatSquare.position = new BABYLON.Vector3(-9, 0.15, 17);
        } );

        BABYLON.SceneLoader.ImportMesh("",sLHC, "", scene, (newMeshes, particleSystems, skeletons) =>{
            shortLightHoleCylinder = newMeshes[0];
            shortLightHoleCylinder.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
            shortLightHoleCylinder.position = new BABYLON.Vector3(-5.5, 0.15, 17);
        } );

        BABYLON.SceneLoader.ImportMesh("",sLHS, "", scene, (newMeshes, particleSystems, skeletons) =>{
            shortLightHoleSquare = newMeshes[0];
            shortLightHoleSquare.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
            shortLightHoleSquare.position = new BABYLON.Vector3(-2, 0.15, 17);
        } );

        BABYLON.SceneLoader.ImportMesh("",tLFC, "", scene, (newMeshes, particleSystems, skeletons) =>{
            tallLightFlatCylinder = newMeshes[0];
            tallLightFlatCylinder.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
            tallLightFlatCylinder.position = new BABYLON.Vector3(2, 0.15, 17);
        } );

        BABYLON.SceneLoader.ImportMesh("",tLFS, "", scene, (newMeshes, particleSystems, skeletons) =>{
            tallLightFlatSquare = newMeshes[0];
            tallLightFlatSquare.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
            tallLightFlatSquare.position = new BABYLON.Vector3(5.5, 0.15, 17);
        } );

        BABYLON.SceneLoader.ImportMesh("",tLHC, "", scene, (newMeshes, particleSystems, skeletons) =>{
            tallLightHoleCylinder = newMeshes[0];
            tallLightHoleCylinder.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
            tallLightHoleCylinder.position = new BABYLON.Vector3(9, 0.15, 17);
        } );

        BABYLON.SceneLoader.ImportMesh("",tLHS, "", scene, (newMeshes, particleSystems, skeletons) =>{
            tallLightHoleSquare = newMeshes[0];
            tallLightHoleSquare.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
            tallLightHoleSquare.position = new BABYLON.Vector3(12.5, 0.15, 17);
        } );

        BABYLON.SceneLoader.ImportMesh("",pieceThatGoesInHole, "", scene, (newMeshes, particleSystems, skeletons) =>{
            holePiece1 = newMeshes[0];
            holePiece1.name = "holePiece1";
            holePiece1.position = board1;
            holePiece1.position.y = 0.015

            holePiece2 = holePiece1.clone("holePiece2");
            holePiece2.position = board2;
            holePiece2.position.y = 0.015;

            holePiece3 = holePiece1.clone("holePiece3");
            holePiece3.position = board3;
            holePiece3.position.y = 0.015;

            holePiece4 = holePiece1.clone("holePiece4");
            holePiece4.position = board4;
            holePiece4.position.y = 0.015;

            holePiece5 = holePiece1.clone("holePiece5");
            holePiece5.position = board5;
            holePiece5.position.y = 0.015;

            holePiece6 = holePiece1.clone("holePiece6");
            holePiece6.position = board6;
            holePiece6.position.y = 0.015;

            holePiece7 = holePiece1.clone("holePiece7");
            holePiece7.position = board7;
            holePiece7.position.y = 0.015;

            holePiece8 = holePiece1.clone("holePiece8");
            holePiece8.position = board8;
            holePiece8.position.y = 0.015;

            holePiece9 = holePiece1.clone("holePiece9");
            holePiece9.position = board9;
            holePiece9.position.y = 0.015;

            holePiece10 = holePiece1.clone("holePiece10");
            holePiece10.position = board10;
            holePiece10.position.y = 0.015;

            holePiece11 = holePiece1.clone("holePiece11");
            holePiece11.position = board11;
            holePiece11.position.y = 0.015;

            holePiece12 = holePiece1.clone("holePiece12");
            holePiece12.position = board12;
            holePiece12.position.y = 0.015;

            holePiece13 = holePiece1.clone("holePiece13");
            holePiece13.position = board13;
            holePiece13.position.y = 0.015;

            holePiece14 = holePiece1.clone("holePiece14");
            holePiece14.position = board14;
            holePiece14.position.y = 0.015;

            holePiece15 = holePiece1.clone("holePiece15");
            holePiece15.position = board15;
            holePiece15.position.y = 0.015;

            holePiece16 = holePiece1.clone("holePiece16");
            holePiece16.position = board16;
            holePiece16.position.y = 0.015;
        } );

        BABYLON.SceneLoader.ImportMesh("", coaster, "", scene, (newMeshes, particleSystems, skeletons) => {
            pieceHolder = newMeshes[0];
            pieceHolder.position = new BABYLON.Vector3(0, 0.069, -13);
        });

        BABYLON.SceneLoader.ImportMesh("",floor, "", scene, (newMeshes, particleSystems, skeletons) =>{
            room = newMeshes[0];
            room.position = new BABYLON.Vector3(0,0,0);
        });


        //Point and click logic
        setTimeout(function() {
            //TRYING TO GET FREAKING SHADOWS TO WORK
            // var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
            // shadowGenerator.getShadowMap().renderList.push(shortDarkFlatCylinder);
            // shadowGenerator.addShadowCaster(shortDarkFlatCylinder);
            // shadowGenerator.useExponentialShadowMap = true;

            // ourGameBoard.receiveShadows = true;
            // slabForPieces.receiveShadows = true;
            // room.receiveShadows = true;

            scene.onPointerDown = function(evt, pickResult) 
            {
                // console.log(pickResult.hit);
                // console.log(pickResult.pickedMesh === holePiece1);
                // console.log(pickResult.pickedMesh);
                // console.log(holePiece1);
                if(pickResult.hit && pickResult.pickedMesh.name === "Cylinder.015")
                {
                    tallLightFlatSquare.position = board1;
                    // targetVec = pickResult.pickedPoint;
                    // ball.position = targetVec.clone();

                    // initVec = board.position.clone();
                    // distVec = BABYLON.Vector3.Distance(targetVec, initVec);

                    // targetVec = targetVec.subtract(initVec);
                    // targetVecNorm = BABYLON.Vector3.Normalize(targetVec);
                }
                else if(pickResult.hit && pickResult.pickedMesh.name === "holePiece2.Cylinder.015")
                {
                    tallLightFlatSquare.position = board2;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name === "holePiece3.Cylinder.015")
                {
                    tallLightFlatSquare.position = board3;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name === "holePiece4.Cylinder.015")
                {
                    tallLightFlatSquare.position = board4;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name === "holePiece5.Cylinder.015")
                {
                    tallLightFlatSquare.position = board5;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name === "holePiece6.Cylinder.015")
                {
                    tallLightFlatSquare.position = board6;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name === "holePiece7.Cylinder.015")
                {
                    tallLightFlatSquare.position = board7;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name === "holePiece8.Cylinder.015")
                {
                    tallLightFlatSquare.position = board8;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name === "holePiece9.Cylinder.015")
                {
                    tallLightFlatSquare.position = board9;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name === "holePiece10.Cylinder.015")
                {
                    tallLightFlatSquare.position = board10;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name === "holePiece11.Cylinder.015")
                {
                    tallLightFlatSquare.position = board11;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name === "holePiece12.Cylinder.015")
                {
                    tallLightFlatSquare.position = board12;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name === "holePiece13.Cylinder.015")
                {
                    tallLightFlatSquare.position = board13;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name === "holePiece14.Cylinder.015")
                {
                    tallLightFlatSquare.position = board14;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name === "holePiece15.Cylinder.015")
                {
                    tallLightFlatSquare.position = board15;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name === "holePiece16.Cylinder.015")
                {
                    tallLightFlatSquare.position = board16;
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
           // <LoadingScreen/>
            <BabylonScene onSceneMount={this.onSceneMount} />
        )
    }
    
}

const mapStateToProps = ({ board }) => {
    const {mounted} = board;
    return {mounted};
};
export default connect(mapStateToProps, {
    updateBoardData
})(Viewer);