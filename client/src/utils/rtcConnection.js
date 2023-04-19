// client/src/utils/rtcConnection.js

import io from 'socket.io-client';

class RTCConnection {
  constructor(roomId) {
    this.roomId = roomId;
    this.socket = io.connect();
    this.peerConnection = new RTCPeerConnection();
    this.dataChannel = null;
  }

  async createOffer() {
    this.dataChannel = this.peerConnection.createDataChannel('channel');
    this.peerConnection.onicecandidate = this.handleICECandidateEvent.bind(this);
    this.dataChannel.onmessage = this.handleDataChannelMessage.bind(this);
    this.peerConnection.ondatachannel = this.handleDataChannel.bind(this);
    
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);

    this.socket.emit('offer', { roomId: this.roomId, offer: offer });
  }

  async handleOffer(offer) {
    this.peerConnection.onicecandidate = this.handleICECandidateEvent.bind(this);
    this.dataChannel = this.peerConnection.createDataChannel('channel');
    this.peerConnection.ondatachannel = this.handleDataChannel.bind(this);
    
    await this.peerConnection.setRemoteDescription(offer);
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);

    this.socket.emit('answer', { roomId: this.roomId, answer: answer });
  }

  async handleAnswer(answer) {
    await this.peerConnection.setRemoteDescription(answer);
  }

  handleICECandidateEvent(event) {
    if (event.candidate) {
      this.socket.emit('ice-candidate', { roomId: this.roomId, candidate: event.candidate });
    }
  }

  handleDataChannel(event) {
    this.dataChannel = event.channel;
    this.dataChannel.onmessage = this.handleDataChannelMessage.bind(this);
  }

  handleDataChannelMessage(event) {
    console.log(`Received message: ${event.data}`);
  }

  addICECandidate(candidate) {
    this.peerConnection.addIceCandidate(candidate);
  }
}

export default RTCConnection;
