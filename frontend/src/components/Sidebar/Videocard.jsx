import React, { useState } from "react";
import { Video, PhoneOff, Mic, MicOff } from "lucide-react";
import PeerService from "../../webrtc/peer";

const Videocard = ({ onJoin, onLeave, inCall = false }) => {
  const [muted, setMuted] = useState(false);

  const toggleMute = () => {
    if (muted) {
      PeerService.hardUnmute();
    } else {
      PeerService.hardMute();
    }
    setMuted(!muted);
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl border border-slate-700/30 p-4 shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-green-500/20 rounded-lg border border-green-300/30">
          <Video className="w-5 h-5 text-green-300" />
        </div>
        <h3 className="text-sm font-semibold text-slate-200">
          Video Call
        </h3>
      </div>

      <p className="text-xs text-slate-400 mb-4">
        Start a real-time video call with users in this room.
      </p>

      {!inCall ? (
        <button
          onClick={onJoin}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white py-2.5 rounded-lg font-semibold"
        >
          <Video size={16} />
          Join Call
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={toggleMute}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold ${
              muted
                ? "bg-slate-700 text-slate-200 hover:bg-slate-600"
                : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
          >
            {muted ? <MicOff size={16} /> : <Mic size={16} />}
            {muted ? "Unmute" : "Mute"}
          </button>

          <button
            onClick={onLeave}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-lg font-semibold"
          >
            <PhoneOff size={16} />
            Leave
          </button>
        </div>
      )}
    </div>
  );
};

export default Videocard;
