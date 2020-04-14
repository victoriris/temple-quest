import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, Segment, Header } from 'semantic-ui-react';
import { launchMultiplayer, resetNetwork } from '../actions';
import { getPeersList, initPeer, listenNetworkData, sendNetworkData, updateNetworkData } from '../actions/NetworkActions';


function UsernameInput(props) {

    const handleInputChange = (e) => props.updateNetworkData('peerId', e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        const { peerId } = props;
        if(/^[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z]*[a-zA-Z]*[a-zA-Z]*[a-zA-Z]*[a-zA-Z]*[a-zA-Z]*/.test(peerId)) {
            props.initPeer(peerId);
            props.listenNetworkData({});
        }
        else {
            alert('Invalid username, all usernames must be between 4 and 10 characters long as well as only letters.')
        }
    };
    const {peerId, peer} =props;
    const isConnected = !!peer;

    if (isConnected) return null;

    return (
        <Segment>
            <Header as='h3' 
            dividing
            textAlign="center">
                Choose your username
            </Header>
            <Input action fluid
            size="large"
            placeholder="My username" >
                <input onChange={handleInputChange}
                value={peerId}/>
                <Button onClick={handleSubmit}
                color="green">
                Save
                </Button>
            </Input>
        </Segment>
    )
};

const mapStateToProps = ({ network }) => {
    const { remotePeerId, onlineUsers, peer, peerId, 
        isInvited, inviteSent, inviteStatus } = network;
    return {remotePeerId, onlineUsers, peer, peerId, 
        isInvited, inviteSent, inviteStatus};
};

export default connect(mapStateToProps, {
    listenNetworkData, initPeer, getPeersList, updateNetworkData, 
    launchMultiplayer, resetNetwork, sendNetworkData
})(UsernameInput);
