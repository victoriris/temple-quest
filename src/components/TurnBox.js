import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';


export class TurnBox extends Component {

    getTurnLabel () {
        const { isUserTurn, selectedPieceId, isSingleMode } = this.props;
        const { peerId, remotePeerId, isOnlineMode, playerOne, playerTwo } = this.props;
        let playerName = 'you';
        let opponentName = 'opponent';
        let plural = isUserTurn ? '' : 's';
        if (!isSingleMode) {
            playerName = isOnlineMode ? peerId : playerOne;
            opponentName = isOnlineMode ? remotePeerId : playerTwo;
            plural = 's';
        }
        const current = isUserTurn ? playerName : opponentName;
        
        const action = selectedPieceId ? `place${plural}` : `pick${plural}`;
        return `${current} ${action}`;
    }

    render() {
        const {selectedPieceId} = this.props;
        const iconName = selectedPieceId ? 'hand point down' : 'grab';

        return (
            <div>
                <Icon name={iconName} />
                {this.getTurnLabel()}
            </div>
        )
    }
}


const mapStateToProps = ({ board, network }) => {
    const { isUserTurn, isOnlineMode, isSingleMode, selectedPieceId } = board;
    const { playerOne, playerTwo } = board;
    const { peerId, remotePeerId } = network;
    return { 
        isUserTurn, isOnlineMode, isSingleMode, selectedPieceId, 
        peerId, playerOne, playerTwo, remotePeerId
    };
};

export default connect(mapStateToProps)(TurnBox);
