import React, { Component } from 'react';
import { Button, Container, Grid, GridColumn, GridRow, Segment, Dimmer, Loader } from 'semantic-ui-react';
import history from '../history';


class ConnectionLost extends Component {

    handleClick = (route) => history.push(route);
    handleExit = () => {};

    render () {
        return(
            <Grid stretched className="choiceScreen" padded centered columns={3}>
                <GridRow>
                    <GridColumn verticalAlign="middle">
                        <Container className="playerChoice">
                            <h1>Connection Lost!</h1>
                            <Segment>
                            <Dimmer active>
                                <Loader content='Trying to reconnect...' />
                            </Dimmer>
                            </Segment>
                        </Container>
  
                        <Container
                        className="mainScreen__option">
                            <Button   size="massive" color="black"
                            onClick={() => this.handleClick('menu')}>
                                MAIN MENU
                            </Button>
                        </Container>
                    </GridColumn>
                </GridRow>
            </Grid>
        );
    }
}

export default ConnectionLost;