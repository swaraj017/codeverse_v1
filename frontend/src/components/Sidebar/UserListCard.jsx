import { Users } from "lucide-react";

const UserListCard = ({ users, userName }) => (
  <div className="bg-slate-800/60 backdrop-blur-sm px-6 py-4 rounded-xl border border-slate-700/50 flex items-center gap-6 min-h-[70px] hover:bg-slate-800/80 transition-all duration-300 shadow-lg">
    <div className="flex items-center gap-3 text-blue-400 text- m whitespace-nowrap font-medium">
      <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
        <Users size={16} />
      </div>
      <span>Active ({users.length})</span>
    </div>
    <div className="flex items-center gap-3 flex-wrap text-sm text-slate-300">
      {users.map((user, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 border ${
            user === userName 
              ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-lg shadow-emerald-500/20" 
              : "bg-slate-700/60 border-slate-600/50 text-slate-300 hover:bg-slate-700/80"
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${user === userName ? "bg-emerald-400" : "bg-slate-400"}`}></div>
          <span className="font-medium">{user}</span>
        </div>
      ))}
    </div>
  </div>
);

export default UserListCard;