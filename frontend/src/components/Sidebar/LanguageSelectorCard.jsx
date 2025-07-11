import { Code2, ChevronDown } from "lucide-react";

const LanguageSelectorCard = ({ language, handleLanguageChange }) => (
  <div className="bg-slate-800/60 backdrop-blur-sm px-6 py-4 rounded-xl border border-slate-700/50 flex items-center gap-6 h-[70px] w-80 hover:bg-slate-800/80 transition-all duration-300 shadow-lg">
    
    {/* Label */}
    <div className="flex items-center gap-3 text-emerald-400 whitespace-nowrap font-medium">
      <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
        <Code2 size={16} />
      </div>
      <span>Language</span>
    </div>

    {/* Select with custom arrow */}
    <div className="relative flex-1">
      <select
        value={language}
        onChange={handleLanguageChange}
        className="w-full appearance-none p-3 pr-10 bg-slate-900/60 text-white rounded-lg outline-none text-sm font-medium border border-slate-700/30 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 backdrop-blur-sm cursor-pointer hover:bg-slate-900/80"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="typescript">TypeScript</option>
      </select>

      {/* Chevron Icon */}
      <ChevronDown
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />
    </div>
  </div>
);

export default LanguageSelectorCard;
