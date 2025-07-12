# 💻 Codeverse – Live Pair Programming Platform

🎯 **Live Demo**: [https://codeverse.onrender.com](https://codeverse.onrender.com)

## 🧠 Overview

**Codeverse** is a real-time collaborative coding platform built for **pair programming**, **technical interviews**, and **live coding sessions**. It features:

- 🧑‍💻 Real-time **code collaboration**
- 🎥 Peer-to-peer **video calling**
- 🌐 Room-based session management
- 💬 Optional team **chat system**
- ⚙️ Built with **WebRTC**, **Socket.IO**, and **Monaco Editor**

---

## 🚀 Features

✅ Real-time collaborative editor (Monaco)  
✅ Peer-to-peer video call with WebRTC  
✅ Dynamic room creation and joining  
✅ Language selector UI (frontend-ready for code execution)  
✅ Modular sidebar: users, room info, language picker  
✅ Elegant responsive UI with TailwindCSS  

---

## 🛠 Tech Stack

### 🎨 Frontend
- React.js (with Vite)
- Tailwind CSS
- Socket.IO Client
- Monaco Editor
- Lucide Icons

### 🧠 Backend
- Node.js
- Express.js
-  WebRTC (RTCPeerConnection)
- Socket.IO (Signaling Server)
- UUID (Room ID generation)

---

## 🧱 Project Structure

codeverse/
├── backend/
│ └── index.js # Socket.IO + Express server
├── frontend/
│ ├── public/
│ └── src/
│ ├── components/
│ │ ├── EditorContainer.jsx
│ │ ├── ChatSidebar/
│ │ └── Sidebar/
│ ├── services/
│ │ └── peer.js # WebRTC Peer Service
│ ├── App.jsx
│ └── main.jsx
