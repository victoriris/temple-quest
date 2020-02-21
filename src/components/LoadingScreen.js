import React, { Component } from 'react';
import {Loader} from 'semantic-ui-react';
import {StopLoading} from '../actions';
import history from '../history';


class LoadingScreen extends Component {


    componentDidMount(){
        //I want the loading screen to appear and then dissappear 
        //after 5 seconds
        // componentwillunmount is a function managed by react, you cant call it
        // would this be before the intro?
        //after the intro, while the game screen is loading.
        //before it shows the board.
        //have you seen how slowly the board loads?
       setTimeout(() => history.push('/game'), 5000);

    }





    render(){
        return(
            <div>
                loading stuff
             </div>
        )
    };
}
