import Peer from 'peerjs';

//yarn upgrade caniuse-lite browserslist
export const peer = new Peer('victormidp', {
    host: 'temple-quest-peerjs.herokuapp.com',
    port: 80,
    debug: 2,
});

peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
    peer.listAllPeers(list => {
        console.log(list)
    });
});

peer.on('error', function({type}) {
    if (type === 'unavailable-id') {
        console.log('Id is taken already');
    }
});