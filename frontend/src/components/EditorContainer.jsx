import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import {
  MessageCircle,
  Code,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import RoomIdCard from "./Sidebar/RoomIdCard";
import UserListCard from "./Sidebar/UserListCard";
import LanguageSelectorCard from "./Sidebar/LanguageSelectorCard";
import ChatSidebar from "./ChatSidebar/ChatSidebar";
import FileSidebar from "./FileExplorer/FileSidebar";

const EditorContainer = ({
  roomId,
  runCode,
  output,
  code,
  language,
  handleLanguageChange,
  handleCodeChange,
  copyRoomId,
  userName,
  users,
  typingUser,
  chatOpen,
  setChatOpen,
  messages,
  sendMessage,
}) => {
  const [chatInput, setChatInput] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSend = () => {
    if (chatInput.trim()) {
      sendMessage(chatInput);
      setChatInput("");
    }
  };
  
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <div className="flex h-screen relative transition-all duration-300 overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      <div
        className={`${sidebarCollapsed ? "w-16" : "w-80"} bg-slate-900/95 backdrop-blur-xl text-white transition-all duration-500 ease-in-out border-r border-slate-800/50 flex flex-col shadow-2xl`}
      >
        <div className="flex items-center justify-between h-16 px-2 sm:px-4 md:px-6 border-b border-slate-800/50 bg-slate-800/30">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3 transition-all duration-500">
              <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-200/30">
                <Code className="text-purple-200 w-5 h-5" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Codeverse
              </span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="hover:bg-slate-700/50 p-2.5 rounded-lg transition-all duration-200 hover:scale-105 border border-slate-700/30 ml-auto"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        <div
          className={`flex-1 overflow-hidden px-4 py-6 space-y-6 transition-all duration-500 ${sidebarCollapsed
              ? "opacity-0 scale-95 pointer-events-none"
              : "opacity-100 scale-100"
            }`}
        >
          <div className="bg-slate-800/40 rounded-xl border border-slate-700/30 ">
            <FileSidebar embedMode />
          </div>

          {typingUser && (
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4 rounded-xl border border-amber-500/30 text-sm text-amber-300 animate-pulse backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                <span className="font-medium">{typingUser} is typing...</span>
              </div>
            </div>
          )}

          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-4 rounded-xl flex items-center justify-center gap-3">
            <MessageCircle size={18} />
            {chatOpen ? "Close Chat" : "Open Chat"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-slate-950">
        <div className="h-auto bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50 px-6 py-4 shadow-lg">
          <div className="flex items-start gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            <LanguageSelectorCard
              language={language}
              handleLanguageChange={handleLanguageChange}
            />
            <UserListCard users={users} userName={userName} />
            <RoomIdCard roomId={roomId} copyRoomId={copyRoomId} />
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 rounded-xl m-1 to-slate-950 ">
            <Editor
              height="60%"
              language={language}
              value={code}
              onChange={handleCodeChange}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                lineHeight: 1.6,
                padding: { top: 20, bottom: 20 },
                smoothScrolling: true,
                cursorBlinking: "smooth",
                renderLineHighlight: "gutter",
                scrollBeyondLastLine: false,
              }}
            />
            <button className="run-btn px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-green-500/25 flex items-center gap-2" onClick={runCode}>Execute</button>
            <textarea
              className="w-full h-full bg-black text-slate-300 rounded-xl font-mono text-sm p-4 resize-none border-none outline-none placeholder:text-slate-500 overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800"
              value={output}
              readOnly
              placeholder="Output will appear here after execution..."
            />

          </div>
        </div>
      </div>

      {chatOpen && (
        <div className="animate-slide-in-right">
          <ChatSidebar
            messages={messages}
            userName={userName}
            chatInput={chatInput}
            setChatInput={setChatInput}
            handleSend={handleSend}
            onClose={() => setChatOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default EditorContainer;
