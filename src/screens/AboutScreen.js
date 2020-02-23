import React, { Component } from 'react';
import history from '../history';
import { Button, Container, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import jungleMainMenu from '../img/mainMenuBackground.mp4';

class AboutScreen extends Component {
    render() {
        return (
            <Grid stretched className="aboutScreen" padded centered columns={3}>
            <video id="jungleVideoMainMenu" src={jungleMainMenu} type="video/mp4" autoPlay muted loop />                
            <GridRow>
                <GridColumn verticalAlign="middle">
                    <Container
                    className="howToPlay">
                                      <h1>About</h1>
                {/* <p>
                 We wanted to select a timeless theme. One that causes a sense of adventure to players of different ages. To accomplish this goal, 
                 we chose to model our game after an Aztec temple. Aztecs were known for having construction, political and commerce skills. 
                 Challenges were part of their nature. In fact, Their main city, Tenochtitlán, was built on a lake. 
                </p> */}
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
                <h1>QUARTO.</h1>
                <p></p>
                    </Container>
                    <Container className="mainScreen__option">
                        <Button   color="black" size="massive"
                        onClick={() => history.goBack()}>
                            BACK
                        </Button>
                    </Container>
                </GridColumn>
            </GridRow>
        </Grid>
            // <div>
            // <h1>404NotFound</h1>
            // <p>At 404NotFound, we strive to create robust, engaging, and entertaining games that will bring joy to players of all ages. 
            // We wanted to select a timeless theme. One that causes a sense of adventure to players of different ages. To accomplish this goal, 
            // we chose to model our game after an Aztec temple. Aztecs were known for having construction, political and commerce skills. 
            // Challenges were part of their nature. In fact, Their main city, Tenochtitlán, was built on a lake. During the conquering from Spain, 
            // Spanish soldiers captured the ruler of that time, Moctezuma. Due to the dominance of the Aztecs over the region, their culture was known for their riches. 
            // And, according to the legend, Moctezuma had one of the biggest treasures. Spanish soldiers tortured Moctezuma to make him reveal the location of the treasure, 
            // but he never did it. Some people believe that at the middle of the chaos, Moctezuma’s guards moved the treasure to a safe place, to where they 
            // eventually took Moctezuma’s body too. In Latin America, it’s been estimated that there are still hundreds of pyramids/temples that haven’t been explored yet. 
            // Maybe one of these temples could have been specially designed for storing this great treasure.The temple could be in the jungle just waiting for someone 
            // with enough skills to challenge it and claim the treasure. This game attempts to take the player to the lost temple, in which his strategy will be 
            // challenged with the simple yet powerful logic of Quarto.
            // </p>
            // <Button name="backButton" color="black" size="large"
            // onClick={() => history.goBack()}>
            //     BACK
            // </Button>
            // </div>
        );
    }
}

export default AboutScreen;