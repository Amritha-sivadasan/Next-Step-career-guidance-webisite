import React, { useEffect, useRef, useState } from "react";
import socket from "../../../config/socket";

const VideoCall: React.FC = () => {
  const [myId, setMyId] = useState<string>('');
  const [peerId, setPeerId] = useState<string>('');
  
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection>(new RTCPeerConnection());

  useEffect(() => {
    // Initialize media and set up event listeners
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      stream.getTracks().forEach((track) => peerConnectionRef.current.addTrack(track, stream));
    });

    socket.on('connect', () => {
      setMyId(socket.id!);
    });

    socket.on('offer', async (data: { target: string; sdp: RTCSessionDescriptionInit; sender: string }) => {
      if (data.target === socket.id) {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        socket.emit('answer', { target: data.sender, sdp: answer });
      }
    });

    socket.on('answer', async (data: { target: string; sdp: RTCSessionDescriptionInit }) => {
      if (data.target === socket.id) {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
      }
    });

    socket.on('ice-candidate', async (data: { target: string; candidate: RTCIceCandidateInit }) => {
      if (data.target === socket.id && data.candidate) {
        await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    });

    peerConnectionRef.current.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        socket.emit('ice-candidate', { target: peerId, candidate: event.candidate });
      }
    };

    peerConnectionRef.current.ontrack = (event: RTCTrackEvent) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    return () => {
      socket.disconnect();
    };
  }, [peerId]);

  const startCall = async () => {
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    socket.emit('offer', { target: peerId, sdp: offer, sender: socket.id });
  };

  return (
    <div>
      <h2>Your ID: {myId}</h2>
      <input type="text" placeholder="Enter Peer ID" value={peerId} onChange={(e) => setPeerId(e.target.value)} />
      <button onClick={startCall}>Start Call</button>
      <div>
        <video ref={localVideoRef} autoPlay muted style={{ width: '300px' }} />
        <video ref={remoteVideoRef} autoPlay style={{ width: '300px' }} />
      </div>
    </div>
  );
};

export default VideoCall;
