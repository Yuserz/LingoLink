import Peer from "simple-peer";

export function createPeer(initiator, stream, signalCallback) {
  const peer = new Peer({
    initiator: initiator,
    trickle: false,
    stream: stream,
  });

  peer.on("signal", (data) => {
    signalCallback(data);
  });

  return peer;
}

export function answerPeer(peer, signal, stream) {
  peer.signal(signal);
  peer.on("stream", (remoteStream) => {
    stream.addTrack(remoteStream.getTracks()[0]);
  });
}

export function destroyPeer(peer) {
  peer.destroy();
}
