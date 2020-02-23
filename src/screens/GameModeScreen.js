import React, { Component } from 'react';
import { Button, Container, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import history from '../history';


class GameModeScreen extends Component{

    handleClick = (route) => history.push(route);

    render() {
        return (
            <Grid stretched className="gameModeScreen" padded
            centered columns={3}>
                <GridRow>
                    <GridColumn verticalAlign="middle">
                        <Container
                        className="gamemodescreen__option">
                            <Button basic size="massive" inverted
                            onClick={() => this.handleClick('local')}>
                                LOCAL
                            </Button>
                        </Container>
                        <Container
                        className="gamemodescreen__option">
                            <Button basic size="massive" inverted
                            onClick={() => this.handleClick('online')}>
                                ONLINE
                            </Button>
                        </Container>
                    </GridColumn>
                </GridRow>
                <GridRow verticalAlign="bottom">         
                    <GridColumn floated="right">
                        <Container>
                            <Button basic floated="right" 
                            inverted size="large"
                            onClick={() => this.handleExit()}>
                                BACK
                            </Button>
                        </Container>
                    </GridColumn>           
                </GridRow>
            </Grid>
        );
    }
}

export default GameModeScreen;