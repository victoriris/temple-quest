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
        return (
            <div className="introScreen">
                <div className="introScreen-logo">
                    <img src={TeamLogo} />
                </div>
                <Dimmer active>
                    <Loader />
                </Dimmer>
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