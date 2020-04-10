import React from 'react';
import { Button, Icon, Container } from 'semantic-ui-react';


const MenuButton = ({onClick, title}) => {

    return (
        <Container
         className="mainScreen__option">
            <button
            className="menuButton"
            onClick={onClick}>
                {title.toUpperCase()}
            </button>
        </Container>
    );

};


export default MenuButton;