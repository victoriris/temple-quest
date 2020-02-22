import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initPeer, listenNetworkData, updateNetworkData, getPeersList, connectToPeer } from '../actions/NetworkActions';
import { Button, Container, Grid, GridColumn, GridRow, List, Icon, Form } from 'semantic-ui-react';
import history from '../history';


class OnlineSetupScreen extends Component{
    
    handleClick = (route) => history.push(route);
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
    
    constructor(props) {
        super(props);
        this.displayPeersList = this.displayPeersList.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.connectToPeer = this.connectToPeer.bind(this);
    }

    render() {
        const {peerId, peer} = this.props;
        const isConnected = !!peer;
        console.log(this.props.onlineUsers);
        return(
            <Grid stretched className="mainScreen" padded centered columns={3}>
            <div className="OnlineScreen">
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

                    {!!this.props.peer && (
                        <Grid verticalAlign="middle">
                        <Container
                        className = "refresh">
                            <Button 
                             color="black" size="massive"
                            
                            onClick={() => this.refreshList()}>
                                REFRESH
                            </Button>
                        </Container>
                        <GridRow>
                        <GridColumn verticalAlign="middle">
                            <Container className="onlineScreen">
                                {this.displayPeersList()}
                            </Container>
                        </GridColumn>
                    </GridRow>
                    </Grid>
                    )}
                <Container
                className="back">
                    <Button  floated="left" 
                    color="black" size="massive"
                    onClick={() => history.goBack()}>
                        BACK
                    </Button>
                    {!!this.props.peer && (
                        <Button  floated="right" 
                        color="black" size="massive"
                        onClick={() => history.push('/board')}>
                            CONNECT
                        </Button>
                    )}
                </Container>
            </div>
            </Grid>
        );
    }

    displayPeersList() {
        var peersList = this.props.onlineUsers;

        return peersList.map((p, idx) => {
            return (
                <List divided relaxed key={idx}>
                    <List.Item onClick={() => this.connectToPeer(p)} className="onlineUser">
                        <Icon name="users" size="large" verticalalign="middle"/>
                        <List.Content className="onlineUser">
                            <List.Header as="a" >{p}</List.Header>
                        </List.Content>
                    </List.Item>
                </List>
            );
        });
    }

    refreshList() {
        this.props.getPeersList();
    }

    connectToPeer(peerId) {
        this.props.updateNetworkData('remotePeerId', peerId);
        this.props.connectToPeer(peerId);
    }
    
}

const mapStateToProps = ({ network }) => {
    console.log('network debug', network);
    const { remotePeerId, onlineUsers, peer, peerId } = network;
    return {remotePeerId, onlineUsers, peer, peerId};
};

export default  connect(mapStateToProps, {
    listenNetworkData, initPeer, getPeersList, updateNetworkData, connectToPeer
})(OnlineSetupScreen);;
