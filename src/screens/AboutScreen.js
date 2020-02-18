import React, { Component } from 'react';
import history from '../history';
import { Button } from 'semantic-ui-react';


class AboutScreen extends Component {
    render() {
        return (
            <div>
            <h1>404NotFound</h1>
            <p>At 404NotFound, we strive to create robust, engaging, and entertaining games that will bring joy to players of all ages. 
            We wanted to select a timeless theme. One that causes a sense of adventure to players of different ages. To accomplish this goal, 
            we chose to model our game after an Aztec temple. Aztecs were known for having construction, political and commerce skills. 
            Challenges were part of their nature. In fact, Their main city, Tenochtitlán, was built on a lake. During the conquering from Spain, 
            Spanish soldiers captured the ruler of that time, Moctezuma. Due to the dominance of the Aztecs over the region, their culture was known for their riches. 
            And, according to the legend, Moctezuma had one of the biggest treasures. Spanish soldiers tortured Moctezuma to make him reveal the location of the treasure, 
            but he never did it. Some people believe that at the middle of the chaos, Moctezuma’s guards moved the treasure to a safe place, to where they 
            eventually took Moctezuma’s body too. In Latin America, it’s been estimated that there are still hundreds of pyramids/temples that haven’t been explored yet. 
            Maybe one of these temples could have been specially designed for storing this great treasure.The temple could be in the jungle just waiting for someone 
            with enough skills to challenge it and claim the treasure. This game attempts to take the player to the lost temple, in which his strategy will be 
            challenged with the simple yet powerful logic of Quarto.
            </p>
            <Button name="backButton"
            onClick={() => history.goBack()}>
                BACK
            </Button>
            </div>
        );
    }
}

export default AboutScreen;