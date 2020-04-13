import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';


export class TurnBox extends Component {
    render() {
        return (
            <div>
                <Icon name='hand point down' />
                Turn
            </div>
        )
    }
}


const mapStateToProps = ({ board }) => {
    const {} = board;
    return {};
};

export default connect(mapStateToProps)(TurnBox);
