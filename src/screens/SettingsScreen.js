import React, { Component } from 'react';
import { Checkbox, Container, Grid, GridColumn, GridRow, Segment } from 'semantic-ui-react';
import history from '../history';
import MenuButton from '../components/MenuButton';


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
                   <MenuButton back />
                </GridColumn>
            </GridRow>
        </Grid>

        );
    }
}

export default SettingsScreen;