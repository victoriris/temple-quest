import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Confirm, Container, Grid, GridColumn, GridRow, Icon, Message } from 'semantic-ui-react';
import { launchMultiplayer, resetNetwork } from '../actions';
import { getPeersList, initPeer, listenNetworkData, sendNetworkData, updateNetworkData } from '../actions/NetworkActions';
import MenuButton from '../components/MenuButton';
import PeersList from '../components/PeersList';
import UsernameInput from '../components/UsernameInput';


class OnlineSetupScreen extends Component{
    
    handleClick = () => this.props.updateNetworkData('inviteSent', true);
    handleConfirm = () => { 
        this.props.sendNetworkData('inviteStatus', 'accepted');
        this.props.launchMultiplayer(true);
    }
    handleCancel = () => {
        this.props.sendNetworkData('inviteStatus', 'declined');
        this.props.updateNetworkData('isInvited', false);
    }

    refreshList() {
        this.props.getPeersList();
    }
    
    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
    }

    componentDidMount() {
        this.props.resetNetwork();
    }

    render() {
        return(

        <Grid stretched className="screen" padded centered columns={3}>
            <GridRow>
                <GridColumn verticalAlign="middle">
                    <Container>
                        <UsernameInput />
                    {this.props.inviteSent && this.props.inviteStatus === 'pending' && (
                           <Message icon>
                               <Icon name='circle notched' loading />
                               <Message.Content>
                                <Message.Header>Invite Sent</Message.Header>
                                    Your invite has been sent, please wait for a response.
                               </Message.Content>
                           </Message> 
                        )}
                        {this.props.inviteStatus === 'declined' && (
                           <Message icon>
                               <Icon name='circle notched' loading />
                               <Message.Content>
                                <Message.Header>Invite Sent</Message.Header>
                                    Your invite has been sent, please wait for a response.
                               </Message.Content>
                           </Message> 
                        )}
                    </Container>
                        <PeersList />
                    <Container
                    className="mainScreen__option">
                        
                        <Confirm
                        open={this.props.isInvited && !this.props.inviteSent}
                        content= {this.props.remotePeerId  + ' would like to play with you!'}
                        cancelButton='DECLINE'
                        confirmButton='ACCEPT'
                        onConfirm={this.handleConfirm}
                        onCancel={this.handleCancel}
                        />
                    </Container>
                    <MenuButton back />
                </GridColumn>
            </GridRow>
        </Grid>

        );
    }
    
}

const mapStateToProps = ({ network }) => {
    const { remotePeerId, onlineUsers, peer, peerId, isInvited, inviteSent, inviteStatus } = network;
    return {remotePeerId, onlineUsers, peer, peerId, isInvited, inviteSent, inviteStatus};
};

export default  connect(mapStateToProps, {
    listenNetworkData, initPeer, getPeersList, updateNetworkData, launchMultiplayer, resetNetwork, sendNetworkData
})(OnlineSetupScreen);;
