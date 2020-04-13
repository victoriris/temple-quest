import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';


export class TurnBox extends Component {

    getTurnLabel () {
        const { isUserTurn, selectedPieceId } = this.props;
        let playerName = 'you';
        let opponentName = 'opponent';
        const current = isUserTurn ? playerName : opponentName;
        const plural = isUserTurn ? '' : 's';
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


const mapStateToProps = ({ board }) => {
    const { isUserTurn, isOnlineMode, isSingleMode, selectedPieceId } = board;
    return { isUserTurn, isOnlineMode, isSingleMode, selectedPieceId };
};

export default connect(mapStateToProps)(TurnBox);
