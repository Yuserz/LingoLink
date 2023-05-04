import { useEffect, useRef } from "react";

export default function useWebRTC(localStream, remoteVideo, signaling) {
  // const pcRef = useRef(null);
  const pcRef = useRef({});

  console.log(pcRef);

  useEffect(() => {
    async function setupConnection() {
      pcRef.current = new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      });

      // Add local stream to the peer connection
      localStream.getTracks().forEach((track) => {
        pcRef.current.addTrack(track, localStream);
      });

      // Handle remote stream when received
      pcRef.current.ontrack = (event) => {
        const remoteStream = event.streams[0];
        remoteVideo.srcObject = remoteStream;
        remoteVideo.play();
      };

      // Create offer when the connection is ready
      pcRef.current.onnegotiationneeded = async () => {
        const offer = await pcRef.current.createOffer();
        await pcRef.current.setLocalDescription(offer);
        signaling.send({
          type: "offer",
          data: {
            sdp: pcRef.current.localDescription,
          },
        });
      };

      // Handle ICE candidates received from the signaling server
      signaling.on("candidate", async (data) => {
        try {
          await pcRef.current.addIceCandidate(data.candidate);
        } catch (error) {
          console.error("Error adding ICE candidate.", error);
        }
      });

      // Handle offers received from the signaling server
      signaling.on("offer", async (data) => {
      
        try {
          await pcRef.current.setRemoteDescription(data.offer.sdp);
          const answer = await pcRef.current.createAnswer();
          await pcRef.current.setLocalDescription(answer);
          signaling.send({
            type: "answer",
            data: {
              sdp: pcRef.current.localDescription,
            },
          });
          console.log("sending offer")
        } catch (error) {
          console.error("Error setting remote description.", error);
        }
      });

      // Handle answers received from the signaling server
      signaling.on("answer", async (data) => {
        try {
          await pcRef.current.setRemoteDescription(data.answer.sdp);
        } catch (error) {
          console.error("Error setting remote description.", error);
        }
      });

      // Close the peer connection when the call ends
      signaling.on("endCall", () => {
        // pcRef.current.close();
      });
    }

    if (localStream && remoteVideo && signaling) {
      setupConnection();
    }

    return () => {
      if (pcRef.current) {
        // pcRef.current.close();
      }
    };
  }, [localStream, remoteVideo, signaling]);

  return pcRef.current;
}
