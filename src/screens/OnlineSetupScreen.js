import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initPeer, listenNetworkData, updateNetworkData, getPeersList } from '../actions/NetworkActions';
import history from '../history';

class OnlineSetupScreen extends Component{
    
    constructor(props) {
        super(props);
        this.connectToPeer = this.connectToPeer.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
        this.displayPeersList = this.displayPeersList.bind(this);
        this.refreshList = this.refreshList.bind(this);
    }

    render() {
        console.log(this.props.onlineUsers);
        return(
            <div className="OnlineScreen">
                <div id="getUsernameDiv">
                    <label>Username: </label>
                    <input id="getName" type="text" pattern="[a-zA-Z]+" minLength="4" maxLength="10" placeholder="username" 
                        title="Username should only contain letters, between 4 and 10 characters long"></input>
                    <button id="userNameButton" 
                    onClick={() => this.checkUsername()}>
                        Submit
                    </button>
                </div>

                    {!!this.props.peer && (
                        <div>
                            <button id='refreshButton' 
                            onClick={() => this.refreshList()}> 
                            Refresh
                            </button>
                            {this.displayPeersList()}
                        </div>
                    )}
                
            </div>
        );
    }

    checkUsername() {
        console.log('checking username');
        var userId = document.getElementById("getName").value;
        console.log(userId);
        if(/^[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z]*[a-zA-Z]*[a-zA-Z]*[a-zA-Z]*[a-zA-Z]*[a-zA-Z]*/.test(userId)) {
            this.props.initPeer(userId);
            this.props.listenNetworkData({});
            document.getElementById('getUsernameDiv').style.display = 'none';
        }
        else {
            alert('Invalid username, all usernames must be between 4 and 10 characters long as well as only letters.')
        }
    }

    displayPeersList() {
        var peersList = this.props.onlineUsers;

        return peersList.map((p, idx) => {
            return (
                <div key={idx}>
                    <button id={p} 
                    onClick={()=>this.connectToPeer(p)} 
                    key={idx}>
                      {p}
                    </button>
                </div>
            );
        });
    }

    refreshList() {
        console.log("words")
        this.props.getPeersList();
    }

    connectToPeer(peerId) {
        history.push('/board')
        return(dispatch) => {
            dispatch(updateNetworkData('remotePeerId', peerId));
        }
    }
}

const mapStateToProps = ({ network }) => {
    const { remotePeerId, onlineUsers, peer } = network;
    return {remotePeerId, onlineUsers, peer};
};

export default  connect(mapStateToProps, {
    listenNetworkData, initPeer, getPeersList
})(OnlineSetupScreen);;
