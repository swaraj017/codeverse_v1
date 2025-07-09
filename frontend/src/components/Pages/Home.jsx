import React from "react";
import Connecting from "./Connecting.png";

const Home = ({ roomId, setRoomId, userName, setUserName, joinRoom }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 text-gray-900 flex items-center justify-center px-4 py-10 lg:py-0">

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-7xl w-full">
        
         
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src={Connecting}
            alt="Collaborative coding"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto rounded-2xl shadow-xl"
          />
        </div>

        {/* Form */}
        <div className="flex-1 w-full flex justify-center lg:justify-start mt-[-20px] lg:mt-0">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-8 sm:p-10 w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Join Your Session</h2>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-800 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-800 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={joinRoom}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Join  
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
