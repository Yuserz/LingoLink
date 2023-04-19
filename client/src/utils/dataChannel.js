// client/src/utils/dataChannel.js

function sendData(channel, message) {
    if (channel.readyState === 'open') {
      channel.send(message);
    }
  }
  
  export { sendData };
  