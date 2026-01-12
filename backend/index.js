import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import axios from "axios";

const app = express();
const server = http.createServer(app);

//http://localhost:5173
//
const url = `https://render-hosting-se2b.onrender.com`;
const interval = 30000;
function reloadWebsite() {
  axios.get(url)
    .then(() => console.log("Website reloaded"))
    .catch((err) => console.error("Error reloading website:", err.message));
}
setInterval(reloadWebsite, interval);

//  Socket setup 
const io = new Server(server, {
  cors: { origin: "*" },
});

// Rooms and socket-user map
const rooms = new Map(); 
const socketToUser = new Map(); 

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  //  Join room 
  socket.on("join", ({ roomId, userName }) => {
  const existing = socketToUser.get(socket.id);
  if (existing) return;  

  socket.join(roomId);
  socketToUser.set(socket.id, { roomId, userName });

  if (!rooms.has(roomId)) {
    rooms.set(roomId, { users: new Map(), code: "// start code here..." });
  }

  const room = rooms.get(roomId);

  // 
  for (const name of room.users.values()) {
    if (name === userName) return;
  }

  room.users.set(socket.id, userName);

  socket.emit("codeUpdate", room.code);

  io.to(roomId).emit(
    "userJoined",
    Array.from(room.users.values())
  );
});


  //  Leave room 
  const leaveRoom = () => {
    const user = socketToUser.get(socket.id);
    if (!user) return;

    const { roomId } = user;
    const room = rooms.get(roomId);
    if (room) {
      room.users.delete(socket.id);

      io.to(roomId).emit(
        "userJoined",
        Array.from(room.users.values())
      );

      if (room.users.size === 0) {
        rooms.delete(roomId);
        console.log(`Room ${roomId} deleted (no users left)`);
      }
    }

    socketToUser.delete(socket.id);
  };

  socket.on("leaveRoom", leaveRoom);
  socket.on("disconnect", () => {
    leaveRoom();
    console.log("User disconnected:", socket.id);
  });

  //  Code editor
  socket.on("codeChange", ({ roomId, code }) => {
    if (!rooms.has(roomId)) return;
    rooms.get(roomId).code = code;
    socket.to(roomId).emit("codeUpdate", code);
  });

  socket.on("compileCode", async ({ roomId, code, language, version, input }) => {
    if (!rooms.has(roomId)) return;
    try {
      const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
        language,
        version,
        files: [{ content: code }],
        stdin: input,
      });
      rooms.get(roomId).output = response.data.run.output;
      io.to(roomId).emit("codeResponse", response.data);
    } catch (err) {
      console.error("Compilation failed:", err.message);
      io.to(roomId).emit("codeResponse", { run: { output: "Error during compilation." } });
    }
  });


  socket.on("typing", ({ roomId, userName }) => {
    socket.to(roomId).emit("userTyping", userName);
  });

  socket.on("chatMessage", ({ roomId, user, message }) => {
    io.to(roomId).emit("chatMessage", { user, message });
  });


  socket.on("languageChange", ({ roomId, language }) => {
    io.to(roomId).emit("languageUpdate", language);
  });

  //  WebRTC Signaling 
  socket.on("video:call", ({ roomId, offer }) => {
    socket.to(roomId).emit("video:incoming", { from: socket.id, offer });
  });

  socket.on("video:answer", ({ roomId, answer }) => {
    socket.to(roomId).emit("video:answer", { from: socket.id, answer });
  });

  socket.on("video:ice-candidate", ({ roomId, candidate }) => {
    socket.to(roomId).emit("video:ice-candidate", { from: socket.id, candidate });
  });

  socket.on("video:end", ({ roomId }) => {
    socket.to(roomId).emit("video:end");
  });
});

// frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

//  server  
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
