import React from 'react';
import { Button, Icon, Container } from 'semantic-ui-react';
import history from '../history';


const BackButton = () => {

    return (
        <Container
         className="mainScreen__option">
            <Button color='black' size="massive" 
            onClick={() => history.goBack()}>
                <Icon name="left arrow" /> Back
            </Button>
        </Container>
    );

};


export default BackButton;