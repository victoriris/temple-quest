import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { endGame } from '../actions';


class EndModal extends Component {

    handleClick = (playAgain) => this.props.endGame(playAgain);

    render() {
        const { isGameOver, isUserTurn } = this.props;
        const message = isUserTurn ? "You've won!!!!!!" : "Game Over, you lost";
        return (
        <Modal
        open={isGameOver}
        basic
        size='small'>
            <Header icon='browser' content={message} />
            <Modal.Content>
            <h3>Do you want to play other round?</h3>
            </Modal.Content>
            <Modal.Actions>
            <Button color='green' onClick={() => this.handleClick(false)} inverted>
                <Icon name='crosshairs' /> No
            </Button>
            <Button color='green' onClick={() => this.handleClick(true)} inverted>
                <Icon name='checkmark' /> Yes
            </Button>
            </Modal.Actions>
        </Modal>
        );
    }
}

const mapStateToProps = ({ board }) => {
    const { score, isGameOver, isUserTurn } = board;
    return { score, isGameOver, isUserTurn };
};

export default connect(mapStateToProps, {
    endGame
})(EndModal);
