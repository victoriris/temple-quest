import React, { Component } from 'react';
import Peer from 'peerjs';
import { initPeer } from '../actions/NetworkActions';

class OnlineSetupScreen extends Component{
    
    constructor(props) {
        super(props);
        this.createPeer = this.createPeer.bind(this);
        this.connectToPeer = this.connectToPeer.bind(this);
        this.getPeersList = this.getPeersList.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
        this.displayPeersList = this.displayPeersList.bind(this);
        this.connecttoPeer = this.connectToPeer.build(this);
    }

    render() {
        return(
            <div className="OnlineScreen">
                <div id="getUsernameDiv">
                    <label for="getName">Username:</label>
                    <input id="getName" type="text" pattern="[a-zA-Z]+" minLength="4" maxLength="10" placeholder="username" 
                        title="Username should only contain letters, between 4 and 10 characters long"></input>
                    <button id="userNameButton" onClick="checkUsername()">Submit</button>
                </div>
                <div id="peersList" display="none">
                </div>
            </div>
        );
    }

    createPeer(peerId) {
        try {
            var peer = new Peer({key: peerId});
            this.props.peer = peer;
        }
        catch (e) {
            return false;
        }
    }
    
    getPeersList() {
        var peersList = this.props.peer.listAllPeers(function cb(list){});
        this.props.peersList = peersList;
       
    }

    checkUsername() {
       var userId = document.getElementById("getName").value;
       if(this.createPeer(userId)) {
         document.getElementById("getUsernameDiv").style.display = "none";
         document.getElementById("peersList").style.display = "block";
       }
       else {
           alert("This username is already taken, please choose a different one");
       }
    }

    displaysPeersList() {
        var html = '';
        if(this.props.peersList.array.size() > 0){
            this.props.peersList.array.forEach(element => {
                html += '<button id=\'' + element.id + '\' onClick=\'connectToPeer(' + element.id + ')\'>' + element.id + '</button>';
            });
        }
        else {
            html = '<p>There are no other users to connect to and play with</p>';
        }
        document.getElementById("peersList").innerHTML = html;
    }

    connectToPeer(peerId) {
        var conn = this.props.peer.connect(peerId);
        this.props.conn = conn;
    }
}

export default OnlineSetupScreen;
