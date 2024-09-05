import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../../../config/socket"; 
import {
  FaVideo,
  FaMicrophone,
  FaPhoneAlt,
  FaVideoSlash,
  FaMicrophoneSlash,
} from "react-icons/fa";
import { updatemeetingStatus } from "../../../services/api/bookingApi";


const VideoCall: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const [myId, setMyId] = useState<string>("");
  const [isCameraOn, setIsCameraOn] = useState<boolean>(true);
  const [isMicOn, setIsMicOn] = useState<boolean>(true);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [callStarted, setCallStarted] = useState<boolean>(false);
  const [callStartTime, setCallStartTime] = useState<number | null>(null);
  const [callDuration, setCallDuration] = useState<string>("00:00");

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Socket connected");
      setMyId(socket.id!);
      socket.emit("joinRoom", meetingId);
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.on("connect", handleConnect);
    }

    const configuration = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }, 
      ],
    };

    peerConnectionRef.current = new RTCPeerConnection(configuration);

    const initMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: isCameraOn,
          audio: isMicOn,
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        stream.getTracks().forEach((track) => {
          if (peerConnectionRef.current) {
            peerConnectionRef.current.addTrack(track, stream);
          }
        });
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    initMedia();

    socket.on(
      "offer",
      async (data: {
        room: string;
        sdp: RTCSessionDescriptionInit;
        sender: string;
      }) => {
        if (data.room === meetingId && data.sender !== socket.id) {
          console.log("Received offer from:", data.sender);
          if (peerConnectionRef.current) {
            await peerConnectionRef.current.setRemoteDescription(
              new RTCSessionDescription(data.sdp)
            );
            const answer = await peerConnectionRef.current.createAnswer();
            await peerConnectionRef.current.setLocalDescription(answer);
            socket.emit("answer", { room: data.sender, sdp: answer });
          }
        }
      }
    );

    socket.on(
      "answer",
      async (data: { room: string; sdp: RTCSessionDescriptionInit }) => {
        if (data.room === socket.id) {
          console.log("Received answer");
          if (peerConnectionRef.current) {
            await peerConnectionRef.current.setRemoteDescription(
              new RTCSessionDescription(data.sdp)
            );
          }
        }
      }
    );

    socket.on(
      "ice-candidate",
      async (data: { room: string; candidate: RTCIceCandidateInit }) => {
        if (data.room === socket.id && data.candidate) {
          if (peerConnectionRef.current) {
            await peerConnectionRef.current.addIceCandidate(
              new RTCIceCandidate(data.candidate)
            );
          }
        }
      }
    );

    peerConnectionRef.current.onicecandidate = (
      event: RTCPeerConnectionIceEvent
    ) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          room: meetingId,
          candidate: event.candidate,
        });
      }
    };

    peerConnectionRef.current.ontrack = (event: RTCTrackEvent) => {
      console.log("Received remote track:", event);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      socket.disconnect();
    };
  }, [meetingId]);

  const startCall = async () => {
    if (peerConnectionRef.current) {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socket.emit("offer", { room: meetingId, sdp: offer, sender: socket.id });
      setCallStarted(true);
      setCallStartTime(Date.now());


      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - (callStartTime || 0);
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        setCallDuration(`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`);
      }, 1000);
    }
  };

  const toggleCamera = () => {
    setIsCameraOn((prev) => !prev);
    if (localStream) {
      const video = localStream
        .getVideoTracks()
        .find((track) => track.kind == "video");
      if (video && isCameraOn) {
        video.enabled = false;
      } else if (video && !isCameraOn) {
        video.enabled = true;
      }
      console.log("video track is", video);
    }
  };

  const toggleMic = () => {
    setIsMicOn((prev) => !prev);
    if (localStream) {
      const audio = localStream
        ?.getAudioTracks()
        .find((track) => track.kind == "audio");
      if (audio && isMicOn) {
        audio.enabled = false;
      } else if (audio && !isMicOn) {
        audio.enabled = true;
      }
      console.log("video track is", audio);
    }
  };

  const updateBookingStatus=async()=>{
  const bookingId= localStorage.getItem('bookingId')
  const status= 'completed'
  if(bookingId){
  const result= await updatemeetingStatus(bookingId,status)
  if(result.success){
    localStorage.removeItem('bookingId')                                                           
  }
  }
  }

  const leaveCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    socket.disconnect();
    updateBookingStatus()
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
   
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-900">
    <div className="p-4 bg-gray-800 flex-shrink-0 shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Your ID: {myId}</h2>
      <div className="flex space-x-4">
        {!callStarted && (
          <button
            onClick={startCall}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Start Call
          </button>
        )}
        <button
          onClick={toggleCamera}
          className={`p-2 rounded-lg shadow-lg ${isCameraOn ? 'bg-green-500' : 'bg-red-500'} text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500`}
        >
          {isCameraOn ? <FaVideo /> : <FaVideoSlash />}
        </button>
        <button
          onClick={toggleMic}
          className={`p-2 rounded-lg shadow-lg ${isMicOn ? 'bg-yellow-500' : 'bg-gray-500'} text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
        >
          {isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </button>
        <button
          onClick={leaveCall}
          className="bg-red-500 text-white p-2 rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <FaPhoneAlt />
        </button>
      </div>
      {callStarted && (
        <div className="mt-4 text-white text-lg">
          Call Duration: {callDuration}
        </div>
      )}
    </div>
    <div className="flex flex-1">
      <div className="flex-1 p-4">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="flex-1 p-4">
        <video
          ref={remoteVideoRef}
          autoPlay
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
  );
};

export default VideoCall;
