import React, { useState } from "react";
import { Video, PhoneOff, Mic, MicOff, RotateCcw } from "lucide-react";
import PeerService from "../../webrtc/peer";

const Videocard = ({ onJoin, onLeave, onRefresh, inCall = false }) => {
  const [muted, setMuted] = useState(false);

  const toggleMute = () => {
    muted ? PeerService.hardUnmute() : PeerService.hardMute();
    setMuted(!muted);
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-700/40 p-5 shadow-xl space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-sm font-semibold text-slate-100">
          Video Call
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Start a real-time video call with users in this room.
        </p>
      </div>

      {/* Not in call */}
      {!inCall ? (
        <button
          onClick={onJoin}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 active:bg-green-700 transition text-white py-2.5 rounded-lg font-semibold"
        >
          <Video size={18} />
          Join Call
        </button>
      ) : (
        <>
          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Refresh */}
            <button
              onClick={onRefresh}
              title="Reconnect"
              className="p-2.5 rounded-lg bg-slate-700/60 hover:bg-slate-600 transition text-slate-200"
            >
              <RotateCcw size={16} />
            </button>

            {/* Mute */}
            <button
              onClick={toggleMute}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold transition ${
                muted
                  ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  : "bg-blue-600 text-white hover:bg-blue-500"
              }`}
            >
              {muted ? <MicOff size={16} /> : <Mic size={16} />}
              {muted ? "Unmute" : "Mute"}
            </button>

            {/* Leave */}
            <button
              onClick={onLeave}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 transition text-white font-semibold"
            >
              <PhoneOff size={16} />
              Leave
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Videocard;
