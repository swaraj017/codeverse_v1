
import { Settings, Code2 } from "lucide-react";

const LanguageSelectorCard = ({ language, handleLanguageChange }) => (
  <div className="bg-slate-800/60 backdrop-blur-sm px-6 py-4 rounded-xl border border-slate-700/50 flex items-center gap-6 h-[70px] w-80 hover:bg-slate-800/80 transition-all duration-300 shadow-lg">
    <div className="flex items-center gap-3 text-emerald-400 text- m whitespace-nowrap font-medium">
      <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
        <Code2 size={16} />
      </div>
      <span>Language</span>
    </div>
    <select
      value={language}
      onChange={handleLanguageChange}
      className="p-3 bg-slate-900/60 text-white rounded-lg outline-none text-sm font-medium border border-slate-700/30 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 backdrop-blur-sm cursor-pointer hover:bg-slate-900/80 flex-1"
    >
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
      <option value="cpp">C++</option>
      <option value="typescript">TypeScript</option>
    </select>
  </div>
);

export default LanguageSelectorCard;