import React, { Component } from 'react';
import { Button, Container, Grid, GridColumn, GridRow, Checkbox, Segment} from 'semantic-ui-react';
import history from '../history';


class SettingsScreen extends Component{
    handleClick = (route) => history.push(route);
    render() {
        return(
            <Grid stretched className="screen" padded centered columns={3}>
            <GridRow>
                <GridColumn verticalAlign="middle">
                    <Container className="screen__box">
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
                    className="screen__btn">
                        <Button
                        icon="left arrow" labelPosition="left"
                        color="black" size="massive"
                        onClick={() => history.goBack()} content="Back" />
                    </Container>
                </GridColumn>
            </GridRow>
        </Grid>

        );
    }
}

export default SettingsScreen;