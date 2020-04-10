import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Modal } from 'semantic-ui-react';
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
        // if (!this.props.isOnlineMode) return null;

        return (
            <Modal trigger={this.props.children}>
                <Modal.Header>Chat</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Header>Default Profile Image</Header>
                    <p>
                        We've found the following gravatar image associated with your e-mail
                        address.
                    </p>
                    <p>Is it okay to use this photo?</p>
                    </Modal.Description>
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
