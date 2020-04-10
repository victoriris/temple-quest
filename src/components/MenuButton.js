import React from 'react';
import { Container, Icon } from 'semantic-ui-react';
import history from '../history';


const MenuButton = ({ onClick, title, back }) => {

    const btnTitle = back ? 'back' : title;
    let btnAction = onClick;
    if (back) {
        btnAction = () => history.goBack();
    }

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

};


export default MenuButton;