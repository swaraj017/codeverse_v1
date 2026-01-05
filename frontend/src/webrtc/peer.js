let localStream = null;
let peerConnection = null;
let onRemoteStreamCallback = null;

const config = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }, // google STUN server
  ],
};

const PeerService = {
  async initLocalStream() {
    if (!localStream) {
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
    }
    return localStream;
  },

  async createPeer(onRemoteStream) {
    peerConnection = new RTCPeerConnection(config);
    onRemoteStreamCallback = onRemoteStream;

   
    localStream.getTracks().forEach((track) =>
      peerConnection.addTrack(track, localStream)
    );

     
    peerConnection.ontrack = (event) => {
      if (onRemoteStreamCallback) onRemoteStreamCallback(event);
    };

    // ice candidate
    peerConnection.onicecandidate = (event) => {
      if (event.candidate && PeerService.onIceCandidate) {
        PeerService.onIceCandidate(event.candidate);
      }
    };


    
    return peerConnection;
  },

  async getOffer() {
    if (!peerConnection) throw new Error("Peer not initialized");
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    return offer;
  },

  async getAnswer(offer) {
    if (!peerConnection) throw new Error("Peer not initialized");
    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    return answer;
  },

  async setRemoteDescription(answer) {
    if (!peerConnection) throw new Error("Peer not initialized");
    await peerConnection.setRemoteDescription(answer);
  },

  async addIceCandidate(candidate) {
    if (!peerConnection) throw new Error("Peer not initialized");
    await peerConnection.addIceCandidate(candidate);
  },
hardMute() {
  if (!peerConnection || !localStream) return;

  const audioTrack = localStream.getAudioTracks()[0];
  if (!audioTrack) return;

  peerConnection.getSenders().forEach((sender) => {
    if (sender.track === audioTrack) {
      sender.replaceTrack(null);
    }
  });
},

hardUnmute() {
  if (!peerConnection || !localStream) return;

  const audioTrack = localStream.getAudioTracks()[0];
  if (!audioTrack) return;

  peerConnection.getSenders().forEach((sender) => {
    if (!sender.track) {
      sender.replaceTrack(audioTrack);
    }
  });
},
  
  async close() {
    if (peerConnection) {
      peerConnection.close();
      peerConnection = null;
    }
    if (localStream) {
      localStream.getTracks().forEach((t) => t.stop());
      localStream = null;
    }
  },

  onIceCandidate: null, // will be assign in vc
};

export default PeerService;
