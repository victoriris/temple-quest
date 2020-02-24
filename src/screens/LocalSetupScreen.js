import React, { Component } from 'react';
import { Button, Container, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import history from '../history';

class LocalSetupScreen extends Component {

    handleClick = (route) => history.push(route);
    handleExit = () => {};

    render () {
        return(
            <Grid stretched className="screen" padded centered columns={3}>
                    <GridColumn verticalAlign="middle"
                    mobile={16} tablet={8} computer={10}>
                        <Container className="screen__box">
                            <h2>Who goes first?</h2>
                            <Button size="massive" color="red" onClick={() => this.handleClick('game')}>Player 1</Button>
                            <Button.Or />
                            <Button size="massive" color="blue" onClick={() => this.handleClick('game')}>Player 2</Button>
                        </Container>
                        <Container
                        className="screen__btn">
                            <Button
                            icon="left arrow" labelPosition="left"
                            color="black" size="massive"
                            onClick={() => history.goBack()} content="Back" />
                        </Container>
                    </GridColumn>
            </Grid>
        );
    }
}

export default LocalSetupScreen;