import { ArcRotateCamera, DirectionalLight, Mesh, Scene, Vector3 } from 'babylonjs';


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

export function getGameScene(canvas, engine) {
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
