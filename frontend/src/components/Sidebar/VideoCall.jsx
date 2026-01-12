import React, { useEffect, useRef, useState } from "react";
import PeerService from "../../webrtc/peer";
import Videocard from "./Videocard";
import { io } from "socket.io-client";

//http://localhost:3000
const socket = io("https://render-hosting-se2b.onrender.com");

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

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
      localVideoRef.current.muted = true;
      await localVideoRef.current.play().catch(() => {});
    }

    await PeerService.createPeer(async (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
        await remoteVideoRef.current.play().catch(() => {});
      }
    });

    PeerService.onIceCandidate = (candidate) => {
      socket.emit("video:ice-candidate", { roomId, candidate });
    };
  };

  const handleJoinCall = async () => {
    await startMedia();
    await new Promise((res) => setTimeout(res, 300));

    const offer = await PeerService.getOffer();
    socket.emit("video:call", { roomId, offer });
    setInCall(true);
  };

  const handleRefreshStream = async () => {
    await PeerService.close();

    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    await startMedia();
    await new Promise((res) => setTimeout(res, 300));

    const offer = await PeerService.getOffer();
    socket.emit("video:call", { roomId, offer });
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
      await new Promise((res) => setTimeout(res, 300));

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
        onRefresh={handleRefreshStream}
        inCall={inCall}
      />

      <div className="h-80 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-4">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-slate-700">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-1 left-1 text-[10px] bg-black/70 px-1.5 py-0.5 rounded text-white">
            You
          </span>
        </div>

        {inCall && (
          <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-slate-700">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-1 left-1 text-[10px] bg-black/70 px-1.5 py-0.5 rounded text-white">
              Participant
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
