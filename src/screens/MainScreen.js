import React, { Component } from 'react';
import { Button, Container, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import history from '../history';


class MainScreen extends Component {

    handleClick = (route) => history.push(route);
    handleExit = () => {};

    render () {
        return(
            <Grid stretched className="mainScreen" padded
            centered columns={3}>
                <GridRow>
                    <GridColumn verticalAlign="middle">
                        <Container
                        className="mainScreen__option">
                            <Button basic size="massive" inverted
                            onClick={() => this.handleClick('play')}>
                                PLAY
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button basic size="massive" inverted
                            onClick={() => this.handleClick('tutorial')}>
                                HOW TO PLAY
                            </Button>
                        </Container>
                    </GridColumn>
                </GridRow>
                <GridRow verticalAlign="bottom">
                    <GridColumn floated="left">
                        <Container>
                            <Button basic floated="left" 
                            inverted size="large"
                            onClick={() => this.handleClick('about')}>
                                ABOUT
                            </Button>
                        </Container>
                    </GridColumn>                
                    <GridColumn floated="right">
                        <Container>
                            <Button basic floated="right" 
                            inverted size="large"
                            onClick={() => this.handleExit()}>
                                EXIT
                            </Button>
                        </Container>
                    </GridColumn>           
                </GridRow>
            </Grid>
        );
    }
}

export default MainScreen;