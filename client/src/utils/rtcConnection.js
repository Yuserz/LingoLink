import { useState, useEffect } from 'react';

const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

export const usePeerConnection = () => {
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    const pc = new RTCPeerConnection(configuration);
    setPeerConnection(pc);

    return () => {
      pc.close();
    };
  }, []);

  return peerConnection;
};

export const createOffer = async (peerConnection) => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  return offer;
};

export const createAnswer = async (peerConnection) => {
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  return answer;
};

export const setRemoteDescription = async (peerConnection, description) => {
  await peerConnection.setRemoteDescription(description);
};

export const addIceCandidate = async (peerConnection, candidate) => {
  await peerConnection.addIceCandidate(candidate);
};
