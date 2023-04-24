import { useEffect, useState } from 'react';

export const useDataChannel = (peerConnection) => {
  const [dataChannel, setDataChannel] = useState(null);

  useEffect(() => {
    if (!peerConnection) return;

    const channel = peerConnection.createDataChannel('data');
    setDataChannel(channel);

    return () => {
      channel.close();
    };
  }, [peerConnection]);

  const sendMessage = async (message) => {
    if (dataChannel.readyState !== 'open') return;

    await dataChannel.send(JSON.stringify(message));
  };

  useEffect(() => {
    if (!dataChannel) return;

    const handleMessage = (event) => {
      console.log('Received message:', event.data);
    };

    dataChannel.addEventListener('message', handleMessage);

    return () => {
      dataChannel.removeEventListener('message', handleMessage);
    };
  }, [dataChannel]);

  return [sendMessage];
};
