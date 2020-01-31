import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { stopIntroLoading } from '../actions';
import TeamLogo from '../img/TeamLogo.svg';


class IntroScreen extends Component {

    componentDidMount () {
     setTimeout(this.props.stopIntroLoading, 5000);
    }

    render() {
        const imgShake = {
            animation: "FadeIn 1.5s ease-in, Shake 0.199s ease-in 2s, FadeOut 1.5s ease-out 3.5s",
            animationIterationCount: "1",
        }
        return (
            <div className="introScreen">
                <div className="introScreen-logo">
                    <img src={TeamLogo} style={imgShake} class="fadeIn" alt=""/>
                </div>

                    <Loader />

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