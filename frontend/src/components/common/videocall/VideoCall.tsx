import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../../../config/socket"; // Update with your actual path
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
  const [, setCallDuration] = useState<string>("00:00");

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
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    updateBookingStatus()
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100">
      <div className="p-6 bg-gray-100 flex-shrink-0">
        <h2 className="text-xl font-semibold mb-4">Your ID: {myId}</h2>
        <div className="mb-4 flex space-x-2">
          {!callStarted && (
            <button
              onClick={startCall}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
            >
              Start Call
            </button>
          )}
          <button
            onClick={toggleCamera}
            className="bg-green-500 text-white p-2 rounded-md shadow-md hover:bg-green-600"
          >
            {isCameraOn ? <FaVideo /> : <FaVideoSlash />}
          </button>
          <button
            onClick={toggleMic}
            className="bg-yellow-500 text-white p-2 rounded-md shadow-md hover:bg-yellow-600"
          >
            {isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
          </button>
          <button
            onClick={leaveCall}
            className="bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-red-600"
          >
            <FaPhoneAlt />
          </button>
        </div>
      </div>
      <div className="flex flex-grow">
        <div className="relative flex flex-col items-center flex-shrink-0 w-1/3 p-2">
          <p className="mb-2 font-medium">Your video</p>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="w-full h-auto border border-gray-300 rounded-md"
          />
        </div>
        <div className="relative flex flex-col items-center flex-grow p-2">
          <p className="mb-2 font-medium">Remote video</p>
          <video
            ref={remoteVideoRef}
            autoPlay
            className="w-full h-full border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
