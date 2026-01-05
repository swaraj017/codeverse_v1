import { Users, ChevronDown } from "lucide-react";

const UserListCard = ({ users, userName }) => (
  <div className="bg-slate-800/60 backdrop-blur-sm px-6 py-4 rounded-xl border border-slate-700/50 flex items-center gap-6 h-[70px] w-80 hover:bg-slate-800/80 transition-all duration-300 shadow-lg">
    
    
    <div className="flex items-center gap-3 text-blue-400 whitespace-nowrap font-medium">
      <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
        <Users size={16} />
      </div>
      <span>Active ({users.length})</span>
    </div>

    
    <div className="flex-1 relative">
      <select
        className="w-full appearance-none bg-slate-900/80 text-slate-200 border border-slate-600 px-4 py-2 pr-10 rounded-lg   transition-all duration-200"
        defaultValue={userName}
      >
        {users.map((user, idx) => (
          <option
            key={idx}
            value={user}
            className="bg-slate-800 text-slate-300"
          >
            {user === userName ? `${user} (You)` : user}
          </option>
        ))}
      </select>

     
      <ChevronDown
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />
    </div>
  </div>
);


export default UserListCard;