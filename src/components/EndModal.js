import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { endGame } from '../actions';


class EndModal extends Component {

    handleClick = (playAgain) => this.props.endGame(playAgain);

    render() {
        const { isGameOver, isUserTurn, isOnlineMode, isSingleMode, isTie } = this.props;
        const { playerOne, playerTwo, peerId, remotePeerId } = this.props;
        let message = isUserTurn ? "You've won!!!!!!" : "Game Over, you lost";
        if (!isSingleMode) {
            if (isOnlineMode) message = isUserTurn ? 'You' : remotePeerId;
            else message = isUserTurn ? playerOne : playerTwo;
            message += ' won the game!';
        }
        if (isTie) message = "Game Over. Is a tie!";
        return (
        <Modal
        open={isGameOver}
        basic
        size='small'>
            <Header icon='flag' content={message} />
            <Modal.Content>
            <h3>Do you want to play other round?</h3>
            </Modal.Content>
            <Modal.Actions>
            <Button color='red' onClick={() => this.handleClick(false)} inverted>
                <Icon name='cancel' /> No
            </Button>
            <Button color='green' onClick={() => this.handleClick(true)} inverted>
                <Icon name='checkmark' /> Yes
            </Button>
            </Modal.Actions>
        </Modal>
        );
    }
}

const mapStateToProps = ({ board, network }) => {
    const { score, isGameOver, isUserTurn, isOnlineMode, isSingleMode, isTie } = board;
    const { playerTwo, playerOne } = board;
    const { peerId, remotePeerId } = network;
    return { 
        score, isGameOver, isUserTurn, isOnlineMode, isSingleMode,
        playerOne, playerTwo, peerId, remotePeerId, isTie
    };
};

export default connect(mapStateToProps, {
    endGame
})(EndModal);
