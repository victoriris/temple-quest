import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stopIntroLoading } from '../actions';
import TeamLogo from '../img/TeamLogo.svg';
import { teamLogoSound } from '../helpers';



class IntroScreen extends Component {

    componentDidMount () {
        setTimeout(this.props.stopIntroLoading, 3000);
    }
    
    render() {

        return (
            <div tabIndex="0" 
            className="introScreen" 
            onAnimationStart={teamLogoSound()}
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