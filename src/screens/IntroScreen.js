import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stopIntroLoading } from '../actions';
import TeamLogo from '../img/TeamLogo.svg';
//import TeamLogoSound from '../sounds/TeamLogo.wav'
//import ReactPlayer from 'react-player';



class IntroScreen extends Component {

    componentDidMount () {
        setTimeout(this.props.stopIntroLoading, 3000);
    }
    
    render() {

        return (
            <div tabIndex="0" 
            className="introScreen" 
            onClick={this.props.stopIntroLoading} 
            onKeyDown={this.props.stopIntroLoading} >
                <div className="introScreen__logo" >
                    <img src={TeamLogo} alt=""/>
                </div>
            </div>
        );

    }
}

const mapStateToProps = ({ intro }) => {
    const { loading } = intro;
    return { loading };
};

export default connect(mapStateToProps, {
    stopIntroLoading
})(IntroScreen);