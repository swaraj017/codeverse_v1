import React, { useEffect, useState } from "react";
import { Code, Users, Video, Share2 } from "lucide-react";

const generateRoomId = () => Math.floor(1000 + Math.random() * 9000).toString();

const LandingPage = () => {
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    setRoomId(generateRoomId());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900">
      {/* Header */}
      <header className="px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Codeverse
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Zero friction live pair programming. Built for real-time development flow.
          </p>

          <a
            href={`/app/${roomId}`}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Go Live 🚀
            <Share2 size={20} className="ml-2" />
          </a>
        </div>
      </header>

      {/* Features */}
      <section className=" px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Everything you need to code together
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code size={40} className="text-blue-500" />}
              title="Live Collaborative Editor / Compiler"
              desc="Real-time typing, cursor sharing, and seamless multi-user synchronization."
            />
            <FeatureCard
              icon={<Video size={40} className="text-purple-500" />}
              title="Built-in Communication"
              desc="Optional WebRTC voice / video calling and messages."
            />
            <FeatureCard
              icon={<Share2 size={40} className="text-indigo-500" />}
              title="Instant Access"
              desc="No accounts, no downloads. Just share a link and start coding together."
            />
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Why Pairlane?</h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Whether you're preparing for technical interviews, teaching programming concepts, 
            or collaborating on code reviews — Pairlane provides instant, friction-free 
            collaboration without the complexity.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-12 bg-gray-50">
        <p>© {new Date().getFullYear()} Pairlane —⚡ by Swaraj Gaikwad</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm mb-10 border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200 text-center">
    <div className="flex justify-center items-center mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);


export default LandingPage;
