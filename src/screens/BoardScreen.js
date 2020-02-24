import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Container, GridColumn } from 'semantic-ui-react';
import { initBoard, selectBagPiece, selectBoardCell, updateBoardData, listenNetworkData } from '../actions';


class BoardScreen extends Component {

    componentWillMount() {
        this.props.initBoard();
    }

    handlePieceClick (pieceId) {
        this.props.selectBagPiece(pieceId);

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
        const { selectedPieceId, isUserTurn, isOnlineMode } = this.props;

        return (
            <Grid className="screen">
                <GridColumn>
                    <Container className="screen__box" verticalAlign="middle" mobile={16} tablet={8} computer={10}>
                        <h1>{`Online mode is ${isOnlineMode ? 'on' : 'off'}`}</h1>
                        <h1>It is {this.props.isUserTurn ? '' : 'NOT'} your turn</h1>
                        <h1>Pieces bag</h1>
                            {(!isOnlineMode || isUserTurn) && !selectedPieceId && this.renderPiecesBag()}
                        <h1>Board cells</h1>
                        <div>
                            {(!isOnlineMode || isUserTurn) && selectedPieceId && this.renderCells()}
                        </div>
                    </Container>
                </GridColumn>
            </Grid>
        )
    }
}

const mapStateToProps = ({ board, network }) => {
    const { remotePeerId, peer } = network;
    const { pieces, isUserTurn, selectedPieceId, isOnlineMode, isSingleMode } = board;
    return { pieces, isUserTurn, selectedPieceId, remotePeerId, isOnlineMode, peer, isSingleMode };
};


export default connect(mapStateToProps, {
    initBoard, selectBagPiece, selectBoardCell, updateBoardData, listenNetworkData
})(BoardScreen);
