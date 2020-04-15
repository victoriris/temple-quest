import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, List, Segment } from 'semantic-ui-react';
import { connectToPeer, getPeersList, initPeer, listenNetworkData, updateNetworkData } from '../actions/NetworkActions';
import Avatar from './Avatar';

class PeersList extends Component {

    componentDidMount () {
        this.props.getPeersList();
    }


    connectToPeer(peerId) {
        this.props.updateNetworkData('remotePeerId', peerId);
        this.props.connectToPeer(peerId);
        this.props.updateNetworkData('inviteSent', true);
    }

    displayPeersListItems () {
        var peersList = this.props.onlineUsers;
        if (!peersList.length) {
            return "No available users";
        }

        return peersList.map((p, idx) => {
            return (
                <List.Item 
                key={idx}
                onClick={() => this.connectToPeer(p)}>
                    <Avatar seed={p} />
                    <List.Content>
                        <List.Header>
                            {p}
                        </List.Header>
                    </List.Content>
                </List.Item>
            );
        });
    }

    render () {
        const {peer, isInvited, inviteSent} = this.props;
        if (!peer || isInvited || inviteSent) return null;
       
        return (
            <Segment>
                <Header as='h3' 
                dividing
                size="large"
                textAlign="left">
                    Online Users
                    <Button color="black" floated="right"
                    onClick={this.props.getPeersList}>
                        Refresh
                    </Button>
                    <Header.Subheader>
                        Select one to send an invite!
                    </Header.Subheader>
                   
                </Header>
                <List selection verticalAlign="middle" size="huge" className="peersList">
                    {this.displayPeersListItems()}
                </List>
            </Segment>
        );
    }
};

const mapStateToProps = ({ network }) => {
    const { remotePeerId, onlineUsers, peer, peerId, inviteSent, isInvited } = network;
    return {remotePeerId, onlineUsers, peer, peerId, inviteSent, isInvited};
};

export default connect(mapStateToProps, {
    listenNetworkData, initPeer, getPeersList, updateNetworkData, connectToPeer
})(PeersList);