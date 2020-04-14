import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Modal, Feed, Input, Icon, Button } from 'semantic-ui-react';
import { listenNetworkData, sendNetworkData, updateNetworkData, sendMessage } from '../actions';
import Avatar from './Avatar';


class ChatBox extends Component {

    handleMessageInput = ({target}) => this.props.updateNetworkData('messageInput', target.value);

    handleMessageSend () {
        this.props.sendMessage(this.props.messageInput);
    }

    renderMessages () {
        return this.props.messages.map((m, idx) => {
            return <Feed.Event key={idx}>
                <Feed.Label>
                    <Avatar seed={m.createdBy} />
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                    <Feed.User>{m.createdBy}</Feed.User>
                    <Feed.Date>{moment(m.createdOn).local().fromNow()}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                        {m.content}
                    </Feed.Extra>
                </Feed.Content>
            </Feed.Event>
        });
    }

    
    render() {
        console.log('Rendering chat box');
        if (!this.props.isOnlineMode) return null;

        return (
            <Modal trigger={this.props.children}>
                <Modal.Header>Chat</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Feed>
                            {this.renderMessages()}
                        </Feed>
                    
                    </Modal.Description>
                    <Input action
                    fluid 
                    size="large"
                    placeholder='Message...'>
                        <input onChange={this.handleMessageInput} 
                        value={this.props.messageInput}/>
                        <Button icon labelPosition='right'
                        onClick={this.handleMessageSend.bind(this)}>
                            Send
                            <Icon name='send' />
                        </Button>
                    </Input>
                </Modal.Content>
            </Modal>
        )
    };

}


const mapStateToProps = ({ network, board }) => {
    const { isOnlineMode } = board;
    const { remotePeerId, messages, peer, messageInput } = network;
    return { remotePeerId, messages, peer, isOnlineMode, messageInput };
};


export default connect(mapStateToProps, {
   updateNetworkData, sendNetworkData, listenNetworkData, sendMessage
})(ChatBox);
