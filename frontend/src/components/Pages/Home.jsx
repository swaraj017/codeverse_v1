import React, { useState } from "react";
import { Code, Video, Share2, Users, Zap, Globe } from "lucide-react";

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-700/50 transition-all duration-300 text-center bg-slate-800/50">
    <div className="flex justify-center items-center mb-6 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-4 text-white transition-colors duration-300">
      {title}
    </h3>
    <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
  </div>
);

const StatCard = ({ number, label }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-indigo-400 mb-2">{number}</div>
    <div className="text-gray-400 text-sm">{label}</div>
  </div>
);

const Home = ({ roomId, setRoomId, userName, setUserName, joinRoom }) => {
   
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-200 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-blue-900/20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight">
                Codeverse
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto lg:mx-0"></div>
            </div>

            <p className="text-xl lg:text-2xl text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Zero friction live pair programming. Built for real-time development flow.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0 pt-8">
              <StatCard number="∞" label="Collaboration" />
              <StatCard number="< 1s" label="Join Time" />
              <StatCard number="0" label="Setup Required" />
            </div>
          </div>

          {/* Right: Enhanced Join Form */}
          <div className="relative">
  <div className="absolute inset-0 bg-slate-800 rounded-3xl"></div>

  <div className="relative bg-slate-800 rounded-3xl shadow-xl p-8 border border-slate-700">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-white">Join Your Session</h2>
    </div>

    <div className="space-y-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full px-4 py-4 bg-slate-900 border border-slate-600 rounded-xl placeholder-gray-500 text-gray-200 focus:outline-none"
        />
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-4 py-4 bg-slate-900 border border-slate-600 rounded-xl placeholder-gray-500 text-gray-200 focus:outline-none"
        />
      </div>

      <button
        onClick={joinRoom}
        className="w-70 bg-indigo-600 font-semibold py-4 rounded-xl text-white"
      >
        <span className="flex items-center justify-center gap-2">
          Join Session
        </span>
      </button>
    </div>
  </div>
</div>

        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
              Everything you need to code together
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Powerful features designed for seamless collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code size={48} className="text-indigo-400" />}
              title="Live Collaborative Editor"
              desc="Real-time typing, cursor sharing, and seamless multi-user synchronization with syntax highlighting."
            />
            <FeatureCard
              icon={<Video size={48} className="text-purple-400" />}
              title="Built-in Communication"
              desc="Optional WebRTC voice/video calling and integrated chat for smooth collaboration."
            />
            <FeatureCard
              icon={<Share2 size={48} className="text-blue-400" />}
              title="Instant Access"
              desc="No accounts, no downloads. Just share a link and start coding together instantly."
            />
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-slate-900/50"></div>
        <div className="relative max-w-5xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white">
            Why choose Codeverse?
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto mb-12">
            Whether you're preparing for technical interviews, teaching programming concepts,
            or collaborating on code reviews — Codeverse provides instant, friction-free
            collaboration without the complexity.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
              <Users size={32} className="text-indigo-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">For Teams</h3>
              <p className="text-gray-400 text-sm">Perfect for code reviews and team collaboration</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
              <Globe size={32} className="text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">For Interviews</h3>
              <p className="text-gray-400 text-sm">Ideal for technical interviews and assessments</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
              <Zap size={32} className="text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">For Learning</h3>
              <p className="text-gray-400 text-sm">Great for teaching and learning programming</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-800/50 py-4">
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Codeverse —  Built by Swaraj
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
