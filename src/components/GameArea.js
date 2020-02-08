import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import BabylonScene from './BabylonScene';
// eslint-disable-next-line
import * as BABYLON_LOADER from 'babylonjs-loaders';
import  sadObject from '../objects/tallLightFlatSquare.glb';
import gayObject from '../objects/tallLightHoleCylinder.glb';
import slightlyHappierObject from '../objects/gameBoard.glb';
// eslint-disable-next-line
import { PositionGizmo, ShadowGenerator } from 'babylonjs';

export default class Viewer extends Component {
    
    onSceneMount = (e) => {
        const { canvas, scene, engine } = e;

        // This creates and positions a free camera (non-mesh)
        const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 16, -12), scene);
        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
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


        //Board Positions
        var board4 = new BABYLON.Vector3(-3.69, 0.069, 1.2);
        var board5 = new BABYLON.Vector3(-1.25, 0.069, 1.2);
        var board15 = new BABYLON.Vector3(3.73, 0.069, -3.85);

        //importing the board object    empty   objectImportName  empty scene (paramsForAnimation)
        BABYLON.SceneLoader.ImportMesh("",slightlyHappierObject, "", scene, (newMeshes, particleSystems, skeletons) =>{
            var board = newMeshes[0];
            board.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
        } )

        //importing a piece
        BABYLON.SceneLoader.ImportMesh("",sadObject, "",  scene, (newMeshes, particleSystems, skeletons) => {
            var tallWhiteFlatSquare = newMeshes[0];
            tallWhiteFlatSquare.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
            tallWhiteFlatSquare.position = board5;
            var alsoTallWhiteFlatSquare = tallWhiteFlatSquare.clone("tallWhiteFlatSquare2");
            alsoTallWhiteFlatSquare.position = board4;
        });

        //this is also importing a piece
        BABYLON.SceneLoader.ImportMesh("", gayObject, "", scene, (newMeshes, particleSystems, skeletons)=> {
            var gayLookingBoy = newMeshes[0];
            gayLookingBoy.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
            gayLookingBoy.position = board15;
        });
        
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