import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormInput } from 'semantic-ui-react';
import { listenNetworkData, sendNetworkData, updateNetworkData } from '../actions';


class ChatBox extends Component {

    componentWillMount () {
        //this.props.listenNetworkData({});
    }

    handleIdChange (value) {
        //this.props.updateNetworkData('remotePeerId', value);
    }

    handleMessageSend () {
        this.props.sendNetworkData('message', 'hello world');
    }

    renderMessages () {
        return this.props.messages.map((m, idx) => {
            return <div key={idx}>
                <p>{m.content}</p>
                <p>sent {moment(m.createdOn).local().fromNow()}</p>
                <p>by {m.createdBy}</p>
            </div>
        });
    }

    
    render() {

        return (
            <div>
                <h1>Network messenger</h1>
                <FormInput onChange={(e,{value}) => this.handleIdChange(value)} />
                <Button onClick={() => this.handleMessageSend()}>
                    Send message
                </Button>
                {this.renderMessages()}
            </div>
        )
    };

}


const mapStateToProps = ({ network }) => {
    const { remotePeerId, messages, peer } = network;
    return { remotePeerId, messages, peer };
};


export default connect(mapStateToProps, {
   updateNetworkData, sendNetworkData, listenNetworkData, 
})(ChatBox);
