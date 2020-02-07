import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormInput } from 'semantic-ui-react';
import { listenNetworkChat, sendChatMessage, updateChatData } from '../actions';


class ChatBox extends Component {

    componentWillMount () {
        this.props.listenNetworkChat();
    }

    handleIdChange (value) {
        this.props.updateChatData('remotePeerId', value);
    }

    handleMessageSend () {
        this.props.sendChatMessage();
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
    const { remotePeerId, messages } = network;
    return { remotePeerId, messages };
};


export default connect(mapStateToProps, {
   updateChatData, sendChatMessage, listenNetworkChat
})(ChatBox);
