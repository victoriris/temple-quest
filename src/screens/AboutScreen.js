import React, { Component } from 'react';
import history from '../history';
import { Button, Container, Grid, GridColumn } from 'semantic-ui-react';


class AboutScreen extends Component {
    render() {
        return (
           <Grid className="aboutScreen"
            stretched padded centered>
                <GridColumn verticalAlign="middle" mobile={16} tablet={8} computer={10}>
                <Container
                className="about"
                textAlign="center">
                    <h1>About</h1>
                <p>
                During the conquering from Spain, 
                Spanish soldiers captured the ruler of that time, Moctezuma. Due to the dominance of the Aztecs over the region, their culture was known for their riches. 
                And, according to the legend, Moctezuma had one of the biggest treasures ever.
                </p>
                <p>
                Spanish soldiers tortured Moctezuma to make him reveal the location of the treasure, 
                but he never did it. Some people believe that at the middle of the chaos, Moctezuma’s guards moved the treasure to a safe place, where they 
                eventually took Moctezuma’s body too. 
                </p>
                <p>
                You, brave explorer, have now come upon the great temple of Moctezuma. The treasure hidden within could be yours! 
                Now, you stand at the entrance of your great Temple Quest, and you can practically feel the gold coins 
                on your fingertips. There's just one thing standing between you and the treasure... Moctezuma’s most mind bending puzzle:
                </p>
                <h2>QUARTO.</h2>
                <p></p>
                    </Container>
                <Container className="mainScreen__option">
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

export default AboutScreen;