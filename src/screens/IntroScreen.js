import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stopIntroLoading } from '../actions';
import TeamLogo from '../img/TeamLogo.svg';



class IntroScreen extends Component {

    stopIntro = () => this.props.stopIntroLoading();

    componentDidMount () {
        setTimeout(this.stopIntro, 3000);
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
    stopIntroLoading
})(IntroScreen);