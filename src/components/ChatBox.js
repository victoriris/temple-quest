import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Modal, Feed, Input, Icon, Button } from 'semantic-ui-react';
import { listenNetworkData, sendNetworkData, updateNetworkData } from '../actions';
import Avatar from './Avatar';


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
            return <Feed.Event key={idx}>
                <Feed.Label>
                    <Avatar />
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
        // if (!this.props.isOnlineMode) return null;

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
                        <input />
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
    const { remotePeerId, messages, peer } = network;
    return { remotePeerId, messages, peer, isOnlineMode };
};


export default connect(mapStateToProps, {
   updateNetworkData, sendNetworkData, listenNetworkData, 
})(ChatBox);
