import React from 'react';
import { Button, Icon, Container } from 'semantic-ui-react';


const MenuButton = ({onClick, title}) => {

    return (
        <Container
         className="mainScreen__option">
            <Button color='black' size="massive" 
            onClick={onClick}>
                {title.toUpperCase()}
            </Button>
        </Container>
    );

};


export default MenuButton;