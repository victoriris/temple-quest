import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { stopIntroLoading } from '../actions';
import TeamLogo from '../img/TeamLogo.svg';


class IntroScreen extends Component {

    componentDidMount () {
    setTimeout(this.props.stopIntroLoading, 3000);
    }
    
    render() {
        const imgShake = {
            animation: "FadeIn 1.2s ease-in, Shake 0.1s ease-in 1.4s, FadeOut 1.2s ease-out 1.8s",
            animationIterationCount: "1",
        }
        
        return (
            <div tabIndex="0" className="introScreen" onClick={this.props.stopIntroLoading} onKeyDown={this.props.stopIntroLoading} >
                <div className="introScreen-logo" >
                    <img src={TeamLogo} style={imgShake} class="fadeIn" alt=""/>
                </div>



            </div>
        )
    }
}

const mapStateToProps = ({ intro }) => {
    const { loading } = intro;
    return { loading };
};

export default connect(mapStateToProps, {
    stopIntroLoading
})(IntroScreen);