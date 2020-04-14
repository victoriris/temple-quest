import React, { Component } from 'react';
import { Icon, List, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { connectToPeer, getPeersList, initPeer, listenNetworkData, updateNetworkData } from '../actions/NetworkActions';


class PeersList extends Component {

    connectToPeer(peerId) {
        this.props.updateNetworkData('remotePeerId', peerId);
        this.props.connectToPeer(peerId);
    }

    displayPeersListItems () {
        var peersList = this.props.onlineUsers;

        return peersList.map((p, idx) => {
            return (
                <List.Item 
                key={idx}
                onClick={() => this.connectToPeer(p)}>
                    <Icon name="users" size="large" verticalalign="middle"/>
                    <List.Content>
                        <List.Header as="a">{p}</List.Header>
                        <List.Description as='a'>An online player</List.Description>
                    </List.Content>
                </List.Item>
            );
        });
    }

    render () {
        if (!this.props.peer) return null;
       
        return (
            <Container className="onlineScreen">
                <List divided relaxed>
                    {this.displayPeersListItems()}
                </List>
            </Container>
        );
    }
};

const mapStateToProps = ({ network }) => {
    const { remotePeerId, onlineUsers, peer, peerId } = network;
    return {remotePeerId, onlineUsers, peer, peerId};
};

export default connect(mapStateToProps, {
    listenNetworkData, initPeer, getPeersList, updateNetworkData, connectToPeer
})(PeersList);