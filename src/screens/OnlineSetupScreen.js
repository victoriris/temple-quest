import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initPeer, listenNetworkData, updateNetworkData } from '../actions/NetworkActions';

class OnlineSetupScreen extends Component{
    
    constructor(props) {
        super(props);
        this.createPeer = this.createPeer.bind(this);
        this.connectToPeer = this.connectToPeer.bind(this);
        this.getPeersList = this.getPeersList.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
        this.displayPeersList = this.displayPeersList.bind(this);
        this.changePeerId = this.changePeerId.bind(this);
    }

    componentWillMount() {
        this.props.initPeer();
        this.props.listenNetworkData({});
    }

    render() {
        return(
            <div className="OnlineScreen">
                <div id="getUsernameDiv">
                    <label>Username: </label>
                    <input id="getName" type="text" pattern="[a-zA-Z]+" minLength="4" maxLength="10" placeholder="username" 
                        title="Username should only contain letters, between 4 and 10 characters long"></input>
                    <button id="userNameButton" onClick={() => this.checkUsername()}>Submit</button>
                </div>
                <div id="peersList" display="none">
                </div>
            </div>
        );
    }

    createPeer(peerId) {
        /*var peer = initPeer;
        peer.id = peerId;
        console.log(peer);*/
    }
    
    getPeersList() {
        var peersList = this.props.peer.listAllPeers(function cb(list){});
        this.props.peersList = peersList;
        console.log(this.props.peersList);
       
    }

    checkUsername() {
        console.log('checking username');
        var userId = document.getElementById("getName").value;
        this.changePeerId(userId);
        this.displayPeersList();
    }

    changePeerId(userId) {
        console.log('hitting the dispatch');
        return(dispatch, getState) => {
            dispatch(updateNetworkData('peerId', userId));
        }
    }

    displayPeersList(getState) {
        var html = '';
        var { peer } = getState().network;
        var peersList = peer.listAllPeers(list => {
            console.log(list)
            html += '<button id=\'' + list + '\' onClick=\'connectToPeer(' + list + ')\'>' + list + '</button>';
        });
        document.getElementById("peersList").innerHTML = html;
    }

    connectToPeer(peerId) {
        return(dispatch, getState) => {
            dispatch(updateNetworkData('remotePeerId', peerId));
        }
    }
}

const mapStateToProps = ({ network }) => {
    const { remotePeerId } = network;
    return {remotePeerId};
};

export default  connect(mapStateToProps, {
    listenNetworkData, initPeer
})(OnlineSetupScreen);;
