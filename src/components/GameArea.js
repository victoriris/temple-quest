import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import BabylonScene from './BabylonScene';
// eslint-disable-next-line
import * as BABYLON_LOADER from 'babylonjs-loaders';
import sadObject from '../objects/tallLightFlatSquare.glb';
import gayObject from '../objects/tallLightHoleCylinder.glb';
import gameBoard from '../objects/newGameBoard.glb';
import pieceThatGoesInHole from '../objects/pieceThatGoesInHole.glb';
import floor from '../objects/floor.glb';
// eslint-disable-next-line
import { PositionGizmo, ShadowGenerator } from 'babylonjs';

export default class Viewer extends Component {
    
    onSceneMount = (e) => {
        const { canvas, engine } = e;
        var scene = new BABYLON.Scene(engine);
        // This creates and positions a free camera (non-mesh)
        const camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 20, new BABYLON.Vector3(20, 0, 0), scene);
        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
        scene.activeCamera.panningSensibility = 0;
        camera.lowerBetaLimit = 0.5;
        camera.upperBetaLimit = (Math.PI / 2) * 0.99;
        camera.upperRadiusLimit = 50;
        camera.lowerRadiusLimit = 20;
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 2.7;
        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        // const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
        // Move the sphere upward 1/2 its height
        // sphere.position.y = 1;
      
        //Ground object
        var ground = BABYLON.Mesh.CreateGround("ground", 15, 15, 1, scene, false);
        var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
        groundMaterial.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        ground.material = groundMaterial;
        ground.receiveShadows = true;

        //Board Pieces
        var tallWhiteFlatSquare;
        var board;
        var room;
        var holePiece1, holePiece2, holePiece3, holePiece4, 
            holePiece5, holePiece6, holePiece7, holePiece8, 
            holePiece9, holePiece10, holePiece11, holePiece12, 
            holePiece13, holePiece14, holePiece15, holePiece16;
        


        //Board Positions
        var board1 = new BABYLON.Vector3(-7.5, 0.069, -7.5);
        var board2 = new BABYLON.Vector3(-7.5, 0.069, -2.5);
        var board3 = new BABYLON.Vector3(-7.5, 0.069, 2.5);
        var board4 = new BABYLON.Vector3(-7.5, 0.069, 7.5);
        var board5 = new BABYLON.Vector3(-2.5, 0.069, -7.5);
        var board6 = new BABYLON.Vector3(-2.5, 0.069, -2.5);
        var board7 = new BABYLON.Vector3(-2.5, 0.069, 2.5);
        var board8 = new BABYLON.Vector3(-2.5, 0.069, 7.5);
        var board9 = new BABYLON.Vector3(2.5, 0.069, -7.5);
        var board10 = new BABYLON.Vector3(2.5, 0.069, -2.5);
        var board11 = new BABYLON.Vector3(2.5, 0.069, 2.5);
        var board12 = new BABYLON.Vector3(2.5, 0.069, 7.5);
        var board13 = new BABYLON.Vector3(7.5, 0.069, -7.5);
        var board14 = new BABYLON.Vector3(7.5, 0.069, -2.5);
        var board15 = new BABYLON.Vector3(7.5, 0.069, 2.5);
        var board16 = new BABYLON.Vector3(7.5, 0.069, 7.5);

        //importing the board object    empty   objectImportName  empty scene (paramsForAnimation)
        BABYLON.SceneLoader.ImportMesh("",gameBoard, "", scene, (newMeshes, particleSystems, skeletons) =>{
            board = newMeshes[0];
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

        BABYLON.SceneLoader.ImportMesh("",floor, "", scene, (newMeshes, particleSystems, skeletons) =>{
            room = newMeshes[0];
            room.position = new BABYLON.Vector3(0,0,0);
        });

        //importing a piece
        BABYLON.SceneLoader.ImportMesh("",sadObject, "",  scene, (newMeshes, particleSystems, skeletons) => {
            tallWhiteFlatSquare = newMeshes[0];
            tallWhiteFlatSquare.name = "tallWhiteFlatSquare";
            tallWhiteFlatSquare.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
            tallWhiteFlatSquare.position = board16;
            var alsoTallWhiteFlatSquare = tallWhiteFlatSquare.clone("tallWhiteFlatSquare2");
            alsoTallWhiteFlatSquare.position = board4;
        });

        //this is also importing a piece
        BABYLON.SceneLoader.ImportMesh("", gayObject, "", scene, (newMeshes, particleSystems, skeletons)=> {
            var gayLookingBoy = newMeshes[0];
            gayLookingBoy.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
            gayLookingBoy.position = board15;
        });

        //Point and click logic
        var targetVec
        var targetVecNorm;
        var initVec;
        var distVec;

        setTimeout(function() {
            scene.onPointerDown = function(evt, pickResult) 
            {
                // console.log(pickResult.hit);
                // console.log(pickResult.pickedMesh === holePiece1);
                // console.log(pickResult.pickedMesh);
                // console.log(holePiece1);
                if(pickResult.hit && pickResult.pickedMesh.name == "Cylinder.015")
                {
                    tallWhiteFlatSquare.position = board1;
                    // targetVec = pickResult.pickedPoint;
                    // ball.position = targetVec.clone();

                    // initVec = board.position.clone();
                    // distVec = BABYLON.Vector3.Distance(targetVec, initVec);

                    // targetVec = targetVec.subtract(initVec);
                    // targetVecNorm = BABYLON.Vector3.Normalize(targetVec);
                }
                else if(pickResult.hit && pickResult.pickedMesh.name == "holePiece2.Cylinder.015")
                {
                    tallWhiteFlatSquare.position = board2;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name == "holePiece3.Cylinder.015")
                {
                    tallWhiteFlatSquare.position = board3;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name == "holePiece4.Cylinder.015")
                {
                    tallWhiteFlatSquare.position = board4;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name == "holePiece5.Cylinder.015")
                {
                    tallWhiteFlatSquare.position = board5;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name == "holePiece6.Cylinder.015")
                {
                    tallWhiteFlatSquare.position = board6;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name == "holePiece7.Cylinder.015")
                {
                    tallWhiteFlatSquare.position = board7;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name == "holePiece8.Cylinder.015")
                {
                    tallWhiteFlatSquare.position = board8;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name == "holePiece9.Cylinder.015")
                {
                    tallWhiteFlatSquare.position = board9;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name == "holePiece10.Cylinder.015")
                {
                    tallWhiteFlatSquare.position = board10;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name == "holePiece11.Cylinder.015")
                {
                    tallWhiteFlatSquare.position = board11;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name == "holePiece12.Cylinder.015")
                {
                    tallWhiteFlatSquare.position = board12;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name == "holePiece13.Cylinder.015")
                {
                    tallWhiteFlatSquare.position = board13;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name == "holePiece14.Cylinder.015")
                {
                    tallWhiteFlatSquare.position = board14;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name == "holePiece15.Cylinder.015")
                {
                    tallWhiteFlatSquare.position = board15;
                }
                else if(pickResult.hit && pickResult.pickedMesh.name == "holePiece16.Cylinder.015")
                {
                    tallWhiteFlatSquare.position = board16;
                }
            };
        }, 1000);

        // scene.registerBeforeRender(function() 
        // {
        //     if(distVec > 0)
        //     {
        //         distVec -= 0.4;
        //         tallWhiteFlatSquare.translate(targetVecNorm, 0.4, BABYLON.Space.WORLD);
        //         //console.log(tallWhiteFlatSquare.position);
        //         console.log(distVec);
        //     }
        // });

        
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