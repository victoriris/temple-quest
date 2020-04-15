import React, { Component } from 'react';
import { Container, Icon } from 'semantic-ui-react';
import history from '../history';
import { playButtonSound } from '../actions';
import { connect } from 'react-redux';


class MenuButton extends Component {

    render () {
        const { onClick, title, back, playButtonSound, hide } = this.props;
        const btnTitle = back ? 'back' : title;

        if (hide) return null;
        let btnAction = () => {
            playButtonSound();
            if (back) {
                history.goBack();
            } else {
                if (onClick) onClick();
            }
        };

        return (
            <Container
            className="mainScreen__option">
                <button
                className="menuButton"
                onClick={btnAction}>
                    {back && (<Icon name="left arrow" />)}
                    {btnTitle}
                </button>
            </Container>
        );
    }

};


export default connect(null, {
    playButtonSound
})(MenuButton);