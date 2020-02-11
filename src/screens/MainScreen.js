import React, { Component } from 'react';
import { Grid, GridColumn, Button, GridRow, Segment, SegmentGroup, ButtonGroup, Container } from 'semantic-ui-react';

class MainScreen extends Component {

    render () {
        return(
            <Grid stretched className="mainScreen" padded
            centered columns={3}>
                <GridRow>
                    <GridColumn verticalAlign="middle">
                        <Container
                        className="mainScreen__option">
                            <Button basic size="massive" inverted>
                                PLAY
                            </Button>
                        </Container>
                        <Container
                        className="mainScreen__option">
                            <Button basic size="massive" inverted>
                                HOW TO PLAY
                            </Button>
                        </Container>
                    </GridColumn>
                </GridRow>
                <GridRow verticalAlign="bottom">
                    <GridColumn floated="left">
                        <Container>
                            <Button basic floated="left" inverted size="large">
                                ABOUT
                            </Button>
                        </Container>
                    </GridColumn>                
                    <GridColumn floated="right">
                        <Container>
                            <Button basic floated="right" inverted size="large">
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