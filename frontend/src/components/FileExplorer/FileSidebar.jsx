import React from 'react';
import { Folder } from 'lucide-react';

const FileSidebar = ({ embedMode }) => {
  return (
    <div className={`w-full min-h-[80px] ${embedMode ? "py-6" : "h-48"} bg-slate-800 border border-slate-700 flex flex-col items-center justify-center text-slate-300 rounded-lg`}>
      <Folder className="w-8 h-8 mb-2 text-slate-200" />
      <p className="text-sm text-center">File Explorer{embedMode && " (coming soon)"}</p>
    </div>
  );
};

export default FileSidebar;
