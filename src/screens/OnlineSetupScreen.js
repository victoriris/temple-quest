import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Form, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import { getPeersList, initPeer, listenNetworkData, updateNetworkData } from '../actions/NetworkActions';
import PeersList from '../components/PeersList';
import history from '../history';
import BackButton from '../components/BackButton';


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

    refreshList() {
        this.props.getPeersList();
    }
    
    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
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
                        <PeersList />
                    <Container
                    className="mainScreen__option">
                         {!!this.props.peer && (<Button 
                            color="black" size="massive"
                            onClick={() => this.refreshList()}>
                                REFRESH
                            </Button>
                        )}
                        <BackButton />
                        {!!this.props.peer && (
                            <Button  floated="right" 
                            color="black" size="massive"
                            onClick={() => history.push('/board')}>
                                CONNECT
                            </Button>
                        )}
                    </Container>
                </GridColumn>
            </GridRow>
        </Grid>

        );
    }
    
}

const mapStateToProps = ({ network }) => {
    const { remotePeerId, onlineUsers, peer, peerId } = network;
    return {remotePeerId, onlineUsers, peer, peerId};
};

export default  connect(mapStateToProps, {
    listenNetworkData, initPeer, getPeersList, updateNetworkData
})(OnlineSetupScreen);;
