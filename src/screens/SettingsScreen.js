import React, { Component } from 'react';
import { Container, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import MenuButton from '../components/MenuButton';
import SettingsBox from '../components/SettingsBox';


class SettingsScreen extends Component{

    render() {
        return(
            <Grid stretched className="screen" padded centered columns={3}>
            <GridRow>
                <GridColumn verticalAlign="middle">
                    <Container>
                        <SettingsBox />
                    </Container>
                   <MenuButton back />
                </GridColumn>
            </GridRow>
        </Grid>

        );
    }
}

export default SettingsScreen;
