
import { Copy, Link } from "lucide-react";
 
const RoomIdCard = ({ roomId, copyRoomId }) => (
  <div className="bg-slate-800/60 backdrop-blur-sm px-9 py-4 rounded-xl border border-slate-700/50 flex items-center gap-6 h-[70px] w-80 hover:bg-slate-800/80 transition-all duration-300 shadow-lg">
    <div className="flex items-center gap-3 text-purple-400 text- m whitespace-nowrap font-medium">
      <div className="p-1 bg-purple-500/20 rounded-lg border border-purple-500/30">
        <Link size={16} />
      </div>
      <span>Invite Link</span>
    </div>
    <div className="flex items-center gap-3 bg-slate-900/60 px-4 py-3 rounded-lg border border-slate-700/30   backdrop-blur-sm flex-1">
      <span className="text-sm text-purple-200 font-mono break-all whitespace-nowrap bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
        {`/app/${roomId}`}
      </span>
      <button 
        onClick={copyRoomId} 
        className="text-slate-400 hover:text-white shrink-0 p-2 hover:bg-slate-700/50 rounded-md transition-all duration-200 hover:scale-110 border border-slate-600/30"
      >
        <Copy size={16} />
      </button>
    </div>
  </div>
);

export default RoomIdCard;