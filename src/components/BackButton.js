import React from 'react';
import { Button, Icon, Container } from 'semantic-ui-react';
import history from '../history';
import { menuClick } from '../helpers';

const BackButton = () => {

    return (
        <Container
         className="mainScreen__option">
            <Button color='black' size="massive" 
            onClick={() => {history.goBack(); menuClick()}}>
                <Icon name="left arrow" /> Back
            </Button>
        </Container>
    );

};


export default BackButton;