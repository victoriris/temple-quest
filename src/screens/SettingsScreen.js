import React, { Component } from 'react';
import { Button, Container, Grid, GridColumn, GridRow, Checkbox, Segment} from 'semantic-ui-react';
import history from '../history';


class SettingsScreen extends Component{
    handleClick = (route) => history.push(route);
    render() {
        return(
            <Grid stretched className="mainScreen" padded centered columns={3}>
            <GridRow>
                <GridColumn verticalAlign="middle">
                    <Container className="settings">
                        <Segment.Group class="settingsGroup">
                            <Segment compact>
                                <Checkbox toggle label="Mute Music" />
                            </Segment>
                            <Segment compact>
                                <Checkbox toggle label="Mute Sound" />
                            </Segment>
                        </Segment.Group>
                    </Container>
                    <Container
                    className="mainScreen__option">
                        <Button  floated="right" 
                         color="black" size="massive"
                        onClick={() => history.goBack()}>
                            BACK
                        </Button>
                    </Container>
                </GridColumn>
            </GridRow>
        </Grid>

        );
    }
}

export default SettingsScreen;