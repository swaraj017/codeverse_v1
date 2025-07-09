import { MessageCircle, X, Send } from "lucide-react";

const ChatSidebar = ({
  messages,
  userName,
  chatInput,
  setChatInput,
  handleSend,
  onClose,
}) => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 shadow-xl flex flex-col absolute right-0 top-0 h-full z-30">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
        <div className="flex items-center gap-2">
          <MessageCircle size={18} /> <span className="font-semibold">Team Chat</span>
        </div>
        <button onClick={onClose} className="hover:bg-white/10 p-1 rounded">
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.user === userName ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-xs">
              <div className="text-xs font-semibold text-gray-500 mb-1">
                {msg.user}
              </div>
              <div className="px-3 py-2 rounded-2xl bg-gray-900 text-white shadow">
                {msg.message}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2 bg-white">
        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSend}
          className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-xl transition"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;
