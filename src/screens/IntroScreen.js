import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stopIntroLoading, playIntroSound } from '../actions';
import TeamLogo from '../assets/img/TeamLogo.svg';



class IntroScreen extends Component {

    stopIntro = () => this.props.stopIntroLoading();

    componentDidMount () {
        setTimeout(this.stopIntro, 3000);
        this.props.playIntroSound();
    }
    
    render() {

        return (
            <div tabIndex="0" 
            className="introScreen" 
            onClick={this.stopIntro} 
            onKeyDown={this.stopIntro} >
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
    stopIntroLoading, playIntroSound
})(IntroScreen);