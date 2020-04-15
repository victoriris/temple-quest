import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Form, Grid, GridColumn, GridRow, Confirm, Message, Icon } from 'semantic-ui-react';
import { launchMultiplayer, resetNetwork } from '../actions';
import { getPeersList, initPeer, listenNetworkData, updateNetworkData, sendNetworkData } from '../actions/NetworkActions';
import BackButton from '../components/BackButton';
import PeersList from '../components/PeersList';


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
    handleInputChange = (e) => this.props.updateNetworkData('peerId', e.target.value);
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('checking username');
        const { peerId } = this.props;
        console.log(peerId);
        if(/^[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z]*[a-zA-Z]*[a-zA-Z]*[a-zA-Z]*[a-zA-Z]*[a-zA-Z]*/.test(peerId)) {
            this.props.initPeer(peerId);
            this.props.listenNetworkData({});
        }
        else {
            alert('Invalid username, all usernames must be between 4 and 10 characters long as well as only letters.')
        }
    };

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
        const {peerId, peer} = this.props;
        const isConnected = !!peer;
        return(

        <Grid stretched className="mainScreen" padded centered columns={3}>
         {!isConnected && (
                    <Form id="usernameField">
                        <Form.Field>
                                <label >Username:</label>
                                <input placeholder="Username" 
                                id="username" 
                                onChange={this.handleInputChange}
                                value={peerId}
                                className="usernameField"/>
                            </Form.Field>
                            <Button onClick={this.handleSubmit} >
                                SUBMIT
                            </Button>
                        </Form>
                    )}
            <GridRow>
                <GridColumn verticalAlign="middle">
                    <Container className="mainScreen_option">
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
                                <Message.Header>Invite Declined</Message.Header>
                                    Your invite has been declined, please invite someone else.
                               </Message.Content>
                           </Message> 
                        )}
                    </Container>
                        <PeersList />
                    <Container
                    className="mainScreen__option">
                         {!!this.props.peer && !this.props.isInvited && !this.props.inviteSent && (
                            <Button 
                            color="black" size="massive"
                            onClick={() => this.refreshList()}>
                                REFRESH
                            </Button>
                        )}
                        <BackButton />
                        {!!this.props.peer && !this.props.isInvited && !this.props.inviteSent && (
                            <Button  floated="right" 
                            color="black" size="massive"
                            onClick={this.handleClick}>
                                CONNECT
                            </Button>
                        )}
                        <Confirm
                        open={this.props.isInvited && !this.props.inviteSent}
                        content= {this.props.remotePeerId  + ' would like to play with you!'}
                        cancelButton='DECLINE'
                        confirmButton='ACCEPT'
                        onConfirm={this.handleConfirm}
                        onCancel={this.handleCancel}
                        />
                    </Container>
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
