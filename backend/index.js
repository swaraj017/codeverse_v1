import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import axios from "axios";
import { stdin } from "process";

const app = express();

const server = http.createServer(app);

const url = `https://render-hosting-se2b.onrender.com`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log("website reloded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const rooms = new Map();

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  let currentRoom = null;
  let currentUser = null;

  socket.on("join", ({ roomId, userName }) => {
    if (currentRoom) {
      socket.leave(currentRoom);
      rooms.get(currentRoom).users.delete(currentUser);
      io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom).users));
    }

    currentRoom = roomId;
    currentUser = userName;

    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        users: new Set(), code: "//start code here.."
      });
    }

    rooms.get(roomId).users.add(userName);
    socket.emit("codeUpdate", rooms.get(roomId).code);

    io.to(roomId).emit("userJoined", Array.from(rooms.get(currentRoom).users));
  });



  socket.on("codeChange", ({ roomId, code }) => {
    if (rooms.has(roomId)) {
      rooms.get(roomId).code = code;
    }
    socket.to(roomId).emit("codeUpdate", code);
  });

  socket.on("leaveRoom", () => {
    if (currentRoom && currentUser) {
      const room = rooms.get(currentRoom);
      if (room) {
        room.users.delete(currentUser);

        // Notify others about user leaving
        io.to(currentRoom).emit("userJoined", Array.from(room.users));

        // If no users left, delete the room
        if (room.users.size === 0) {
          rooms.delete(currentRoom);
          console.log(`Room ${currentRoom} deleted (no users left)`);
        }
      }
    }
    socket.disconnect();
  });

  socket.on("typing", ({ roomId, userName }) => {
    socket.to(roomId).emit("userTyping", userName);
  });

  socket.on("languageChange", ({ roomId, language }) => {
    io.to(roomId).emit("languageUpdate", language);
  });

  socket.on("compileCode", async ({ code, roomId, language, version, input }) => {
    if (rooms.has(roomId)) {
      const room = rooms.get(roomId);
      try {
        const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
          language,
          version,
          files: [
            {
              content: code,
            },
          ],
          stdin: input,
        });

        room.output = response.data.run.output;
        io.to(roomId).emit("codeResponse", response.data);
      } catch (err) {
        console.error("Compilation failed:", err.message);
        io.to(roomId).emit("codeResponse", {
          run: {
            output: "Error during compilation.",
          },
        });
      }
    }
  });


  
socket.on("disconnect", () => {
  if (currentRoom && currentUser) {
    const room = rooms.get(currentRoom);
    if (room) {
      room.users.delete(currentUser);
      io.to(currentRoom).emit("userJoined", Array.from(room.users));

      
      if (room.users.size === 0) {
        rooms.delete(currentRoom);
        console.log(`Room ${currentRoom} deleted (no users left)`);
      }
    }
  }
  console.log("User Disconnected");
});

  socket.on("chatMessage", ({ roomId, user, message }) => {
    io.to(roomId).emit("chatMessage", { user, message });
  });
});

const port = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(port, () => {
  console.log("server is working on port 5000");
});
