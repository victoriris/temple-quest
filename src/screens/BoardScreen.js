import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Radio } from 'semantic-ui-react';
import { initBoard, selectBagPiece, selectBoardCell, updateBoardData } from '../actions';
import ChatBox from '../components/ChatBox';


class BoardScreen extends Component {

    componentWillMount() {
        this.props.initBoard();
    }

    handleOnlineChange () {
        const { isOnlineMode } = this.props;
        this.props.updateBoardData('isOnlineMode', !isOnlineMode);
    }

    handlePieceClick (pieceId) {
        this.props.selectBagPiece(pieceId);

        this.props.miniMaxStart();
    }

    handleCellClick (row, column) {
        this.props.selectBoardCell(row, column);
    }

    renderPiecesBag () {
        const {pieces} = this.props;

        return pieces.map(({id, location}) => {
            return (
                <Button key={id} disabled={!!location}
                onClick={() => this.handlePieceClick(id)}>
                    {id}
                </Button>
            );
        });
    }

    isUsedLocation(row, column) {
        return !!this.props.pieces.find((piece) => {
            if (!piece.location) return false;
            const { location } = piece;
            return location.row === row && location.column === column
        });
    }

    renderCells () {
        const boardCells = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                const id = "ABCD"[r] + (c + 1);
                boardCells.push(
                    <Button key={id}
                    disabled={this.isUsedLocation(r, c)}
                    onClick={() => this.handleCellClick(r,c)}>
                        {id}
                    </Button>
                );
            }
            boardCells.push(<br key={'r'+r}></br>);
        }
        return boardCells;
    }

    render() {
        const { selectedPieceId, bagOrBoard, isOnlineMode } = this.props;
        return (
            <div>
                <Radio toggle 
                onChange={this.handleOnlineChange.bind(this)}
                label={`Online mode is ${isOnlineMode ? 'on' : 'off'}`} 
                checked={isOnlineMode}/>
                <h1>Current turn: Player {this.props.bagOrBoard ? 1 : 2}</h1>
                <h1>Pieces bag</h1>
                    {(!isOnlineMode || bagOrBoard) && !selectedPieceId && this.renderPiecesBag()}
                <h1>Board cells</h1>
                <div>
                    {(!isOnlineMode || bagOrBoard) && selectedPieceId && this.renderCells()}
                </div>
                <ChatBox />
            </div>
        )
    }
}

const mapStateToProps = ({ board, network }) => {
    const { remotePeerId } = network;
    const { pieces, bagOrBoard, selectedPieceId, isOnlineMode } = board;
    return { pieces, bagOrBoard, selectedPieceId, remotePeerId, isOnlineMode };
};


export default connect(mapStateToProps, {
    initBoard, selectBagPiece, selectBoardCell, updateBoardData
})(BoardScreen);
