import { Vector3 } from '@babylonjs/core/Maths/math';
import React, { Component } from 'react';
import { ArcRotateCamera, Engine, Ground, Model, Scene } from 'react-babylonjs';
import { connect } from 'react-redux';
import { initBoard, selectBagPiece, selectBoardCell, stopMusic, updateBoardData, updatePieceObject } from '../actions';
import GameNavbar from '../components/GameNavbar';
import RoomLights from '../components/RoomLights';
import RoomWalls from '../components/RoomWalls';
import EndModal from '../components/EndModal';


let baseUrl = `${process.env.PUBLIC_URL}/objects/`;

class GameScreen extends Component {

    componentWillMount() {
        this.props.stopMusic();
        this.props.initBoard();
    }

    handleOnlineChange () {
        const { isOnlineMode } = this.props;
        this.props.updateBoardData('isOnlineMode', !isOnlineMode);
    }

    hasValidTurn() {
        const { isUserTurn, isSingleMode, isOnlineMode } = this.props;
        return !(!isUserTurn && (isSingleMode || isOnlineMode));
    }

    handlePieceClick (pieceId) {
        const { selectBagPiece } = this.props;
        if (!this.hasValidTurn()) return;
        selectBagPiece(pieceId);
    }

    handleCellClick (row, column) {
        const { selectBoardCell } = this.props;
        if (!this.hasValidTurn()) return;
        selectBoardCell(row, column, false);
    }

    isUsedLocation(row, column) {
        return !!this.props.pieces.find((piece) => {
            if (!piece.location) return false;
            const { location } = piece;
            return location.row === row && location.column === column
        });
    }

    meshPicked(mesh) {
        //console.log(mesh);
        const {cellCords} = this.props;
        const {name, _absolutePosition : position} = mesh;
        //console.log(name);
        if (name === 'Cylinder.015') {
            const cellIdx = cellCords.findIndex((cell) => {
                return cell[0] === position.x && cell[2] === position.z;
            });
            if (cellIdx < 0) return;
            // TODO: Update cord of selected piece
            const column = parseInt(cellIdx) % 4;
            const row = Math.floor(parseInt(cellIdx) / 4);
            this.handleCellClick(row, column);
        }
        else if (name.includes('_primitive')) {
            //console.log(name);
            const piece = this.props.pieceObjects.find(((piece) => {
                return name.includes(piece.obj);
            }));
            if (piece) {
                // UPDATE DELECTED PIECE ID
                this.handlePieceClick(piece.id);
            }
        }
            
    }

    onSceneMount (e) {
        const {scene} = e;
        scene.getEngine().displayLoadingUI();
        setTimeout(() => {  
            scene.getEngine().hideLoadingUI();
        }, 5000);
    }

    render () {

        return (
            <>
            <EndModal />
            <GameNavbar />
          <Engine canvasId="playground" adaptToDeviceRatio antialias>
            <Scene 
            onSceneMount={this.onSceneMount}
            onMeshPicked={this.meshPicked.bind(this)} >
                <ArcRotateCamera 
                name="camera1"
                alpha={0} beta={0}
                radius={35} 
                setPosition={[new Vector3(30, 25, 0)]}
                lowerBetaLimit = {0.5}
                upperRadiusLimit = {40}
                lowerRadiusLimit = {20}
                panningSensibility = {0}
                upperBetaLimit = {(Math.PI / 2) * 0.99}
                target={Vector3.Zero()} 
                minZ={0.001} />
                <RoomLights />
                <Model sceneFilename="gameBoard.glb"
                    rootUrl = {baseUrl}
                />
                <Model sceneFilename="slabForPieces.glb"
                    rootUrl = {baseUrl}
                    position = { new Vector3(0, 0.069, 15) }
                />
                <Model sceneFilename="coaster.glb"
                    rootUrl = {baseUrl}
                    position = { new Vector3(0, 0.15, -13) }
                />
                <RoomWalls />
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
        </>
        );
    }

    renderPieces () {
        const pieceScaling = new Vector3(0.6, 0.6, 0.6);
        return this.props.pieceObjects.map((piece, idx) => {
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
        return this.props.cellCords.map((cord, idx)=>{
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
    const { pieces, isUserTurn, selectedPieceId, isOnlineMode } = board;
    const { hasPieceBeenPicked, cellCords, pieceObjects, isSingleMode } = board;
    return { 
        pieces, isUserTurn, selectedPieceId, 
        isOnlineMode, hasPieceBeenPicked, 
        cellCords, pieceObjects, isSingleMode
    };
};

export default connect(mapStateToProps, {
    initBoard, selectBagPiece, selectBoardCell, updateBoardData, updatePieceObject, stopMusic
})(GameScreen);
