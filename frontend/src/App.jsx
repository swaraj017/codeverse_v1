 
import { useEffect, useState, version } from "react";
import "./index.css";
import io from "socket.io-client";
import Home from "./components/Pages/Home.jsx";
import EditorContainer from "./components/EditorContainer.jsx";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

//http://localhost:5000

const socket = io("https://codeverse-v1.onrender.com");  

const App = () => {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// start code here");
  const [copySuccess, setCopySuccess] = useState("");
  const [users, setUsers] = useState([]);
  const [typing, setTyping] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [output,setOutput]=useState("");
  const [version,setVersion]=useState("*");

  useEffect(() => {
    socket.on("userJoined", (users) => {
      setUsers(users);
    });

    socket.on("codeUpdate", (newCode) => {
      setCode(newCode);
    });
    
    socket.on("userTyping", (user) => {
      setTyping(`${user.slice(0, 8)}... is typing`);
      setTimeout(() => setTyping(""), 2000);
    });

    socket.on("languageUpdate", (newLanguage) => {
      setLanguage(newLanguage);
    });

     

    socket.on("chatMessage", ({ user, message }) => {
      setMessages((prev) => [...prev, { user, message }]);
    });
    
    socket.on("codeResponse",(response)=>
    {
      setOutput(response.run.output);
    })


    return () => {
      socket.off("userJoined");
      socket.off("codeUpdate");
      socket.off("userTyping");
      socket.off("languageUpdate");
      socket.off("chatMessage");
      socket.off("codeResponse");
    };
  }, []);

  useEffect(() => {
    if (!roomId) {
    setRoomId(generateRoomId());
  }
    const handleBeforeUnload = () => {
      socket.emit("leaveRoom");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
     
  
 
  }, []);

  const joinRoom = () => {
    if (roomId && userName) {
      socket.emit("join", { roomId, userName });
      setJoined(true);
    }
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom");
    setJoined(false);
    setRoomId("");
    setUserName("");
    setCode("// start code here");
    setLanguage("javascript");
    setMessages([]);
  };
  const generateRoomId = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};
const createRoom = () => {
  const newRoomId = generateRoomId();
  setRoomId(newRoomId);
};
  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeChange", { roomId, code: newCode });
    socket.emit("typing", { roomId, userName });
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    socket.emit("languageChange", { roomId, language: newLanguage });
  };

    

  const sendMessage = (message) => {
    if (message.trim() !== "") {
      socket.emit("chatMessage", { roomId, user: userName, message });
    }
  };

  const runCode=()=>
  {
      socket.emit("compileCode",{code,roomId,language,version});

  }

  if (!joined) {
    return (
      <Home
        roomId={roomId}
        setRoomId={setRoomId}
        userName={userName}
        setUserName={setUserName}
        joinRoom={joinRoom}
      />
    );
  }

  return (
    <div className="editor-container">
      <EditorContainer
        roomId={roomId}
        code={code}
        language={language}
        handleLanguageChange={handleLanguageChange}
        handleCodeChange={handleCodeChange}
        copyRoomId={copyRoomId}
        userName={userName}
        users={users}
        typingUser={typing}
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
        messages={messages}
        runCode={runCode}
        output={output}
        sendMessage={sendMessage}
      />

    </div>
  );
};

export default App;
