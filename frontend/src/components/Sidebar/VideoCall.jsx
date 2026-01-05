import React, { useEffect, useRef, useState } from "react";
import PeerService from "../../webrtc/peer";
import Videocard from "./Videocard";
import { io } from "socket.io-client";

const socket = io("https://codeverse-v1.onrender.com");

const VideoCall = ({ roomId, userName }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [inCall, setInCall] = useState(false);

  useEffect(() => {
    if (!userName) return;
    socket.emit("join", { roomId, userName });
  }, [roomId, userName]);

  const startMedia = async () => {
    const stream = await PeerService.initLocalStream();
    localVideoRef.current.srcObject = stream;

    await PeerService.createPeer((event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    });

    PeerService.onIceCandidate = (candidate) => {
      socket.emit("video:ice-candidate", { roomId, candidate });
    };
  };

  const handleJoinCall = async () => {
    await startMedia();
    const offer = await PeerService.getOffer();
    socket.emit("video:call", { roomId, offer });
    setInCall(true);
  };

  const handleLeaveCall = async () => {
    await PeerService.close();
    setInCall(false);

    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    socket.emit("leaveRoom");
  };

  useEffect(() => {
    socket.on("video:incoming", async ({ offer }) => {
      await startMedia();
      const answer = await PeerService.getAnswer(offer);
      socket.emit("video:answer", { roomId, answer });
      setInCall(true);
    });

    socket.on("video:answer", async ({ answer }) => {
      await PeerService.setRemoteDescription(answer);
    });

    socket.on("video:ice-candidate", async ({ candidate }) => {
      await PeerService.addIceCandidate(candidate);
    });

    return () => {
      socket.off("video:incoming");
      socket.off("video:answer");
      socket.off("video:ice-candidate");
    };
  }, []);

  return (
    <div className="space-y-4">
      <Videocard
        onJoin={handleJoinCall}
        onLeave={handleLeaveCall}
        inCall={inCall}
      />

      <div className="flex gap-4">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="w-40 rounded-lg border"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-64 rounded-lg border"
        />
      </div>
    </div>
  );
};

export default VideoCall;
