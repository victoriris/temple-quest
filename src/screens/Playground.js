import { Vector3 } from 'babylonjs';
import 'babylonjs-loaders';
import React, { Component } from 'react';
import { ArcRotateCamera, DirectionalLight, Engine, Ground, Model, Scene, ShadowGenerator, Button3D } from 'react-babylonjs';
import { connect } from 'react-redux';
import { initBoard, selectBagPiece, selectBoardCell, updateBoardData } from '../actions';
import { pieceThatGoesInHole, cellCords } from '../objects';

let baseUrl = `${process.env.PUBLIC_URL}/objects/`;
const pieceObjects = [
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

class Playground extends Component {

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

    meshPicked(mesh) {
        const {name, _absolutePosition : position} = mesh;
        console.log(name);
        if (name === 'Cylinder.015') {
            console.log(position.x, position.z);
            const cellIdx = cellCords.findIndex((cell) => {
                return cell[0] === position.x && cell[2] === position.z;
            });
            if (!cellIdx) return;
            // TODO: Update cord of selected piece
            const column = parseInt(cellIdx) % 4;
            const row = Math.floor(parseInt(cellIdx) / 4);
            this.handleCellClick(row, column)
        }
        else if (name.includes('_primitive')) {
            console.log(name);
            const piece = pieceObjects.find(((piece) => {
                return name.includes(piece.obj);
            }));
            if (piece) {
                // UPDATE DELECTED PIECE ID
                console.log(piece.id);
                this.handlePieceClick(piece.id);
            }
        }
            
    }

    render () {
        

        return (
          <Engine canvasId="playground" adaptToDeviceRatio antialias>
            <Scene 
            onMeshPicked={this.meshPicked.bind(this)} 
            >
                <ArcRotateCamera 
                name="camera1"
                alpha={0} beta={0}
                radius={35} 
                setPosition={[new Vector3(30, 0, 0)]}
                lowerBetaLimit = {0.5}
                upperRadiusLimit = {50}
                lowerRadiusLimit = {20}
                panningSensibility = {0}
                upperBetaLimit = {(Math.PI / 2) * 0.99}
                target={Vector3.Zero()} 
                minZ={0.001} />
                <DirectionalLight name="dl01" 
                intensity={1.7}
                direction={new Vector3(-1, -.35, 1)} 
                position = {new Vector3(20, 20, -20)}>
                  <ShadowGenerator mapSize={1024} useBlurExponentialShadowMap={true} blurKernel={32} shadowCasters={["counterClockwise", "clockwise", "BoomBox"]} />
                </DirectionalLight>
                <DirectionalLight name="dl02" 
                intensity={1.7}
                direction={new Vector3(1, -.35, -1)} 
                position = {new Vector3(-20, 20, 20)}>
                  <ShadowGenerator mapSize={1024} useBlurExponentialShadowMap={true} blurKernel={32} shadowCasters={["counterClockwise", "clockwise", "BoomBox"]} />
                </DirectionalLight>
                <DirectionalLight name="dl03" 
                intensity={1.7}
                direction={new Vector3(-1, -.35, -1)} 
                position = {new Vector3(20, 20, 20)}>
                  <ShadowGenerator mapSize={1024} useBlurExponentialShadowMap={true} blurKernel={32} shadowCasters={["counterClockwise", "clockwise", "BoomBox"]} />
                </DirectionalLight>
                <DirectionalLight name="dl04" 
                intensity={1.7}
                direction={new Vector3(1, -.35, 1)} 
                position = {new Vector3(-20, 20, -20)}>
                  <ShadowGenerator mapSize={1024} useBlurExponentialShadowMap={true} blurKernel={32} shadowCasters={["counterClockwise", "clockwise", "BoomBox"]} />
                </DirectionalLight>

                <Model sceneFilename="gameBoard.glb"
                    rootUrl = {baseUrl}
                />
                <Model sceneFilename="slabForPieces.glb"
                    rootUrl = {baseUrl}
                    position = { new Vector3(0, 0.069, 15) }
                />
                <Model sceneFilename="coaster.glb"
                    rootUrl = {baseUrl}
                    position = { new Vector3(0, 0.069, -13) }
                />
                <Ground name="ground" subdivisions={1} >
                <Model sceneFilename="floor.glb"
                    rootUrl = {baseUrl}
                    position = {Vector3.Zero() }
                />

              </Ground>
                {this.renderCells()}
                {this.renderPieces()}
            </Scene>
          </Engine>
        );

    }

    renderPieces () {
        const pieceScaling = new Vector3(0.6, 0.6, 0.6);
        return pieceObjects.map((piece, idx) => {
            const {loc} = piece;
            return (
                <Model 
                name={'hehe'}
                sceneFilename={`${piece.obj}.glb`}
                    rootUrl = {baseUrl}
                    position = {new Vector3(loc[0], loc[1], loc[2])}
                    scaling = {pieceScaling}
                    key={idx}
                />
            );
        });
    }

    renderCells() {
        return cellCords.map((cord, idx)=>{
            return (
                <Model sceneFilename="pieceThatGoesInHole.glb"
                    rootUrl = {baseUrl}
                    position = {new Vector3(cord[0], 0.015, cord[2])}
                    key={idx}
                    meshNames={["testing!"]}
                />
            );
        });
    }
}


const mapStateToProps = ({ board, network }) => {
    const { pieces, isUserTurn, selectedPieceId, isOnlineMode, hasPieceBeenPicked } = board;
    return { pieces, isUserTurn, selectedPieceId, isOnlineMode, hasPieceBeenPicked };
};

export default connect(mapStateToProps, {
    initBoard, selectBagPiece, selectBoardCell, updateBoardData
})(Playground);
