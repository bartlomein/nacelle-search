import React from "react";
import { Link } from "react-router-dom";
import { Search, Bell } from "lucide-react";

const WelcomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-6xl shadow-xl p-8 max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Bart's Nacelle Take home assignment
          </h1>
          <p className="text-gray-600 mb-8">Choose where you'd like to go:</p>
        </div>

        <div className="space-y-4">
          <Link
            to="/search"
            className="flex items-center justify-between w-full px-6 py-4 text-left bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all duration-200"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Search</h2>
              <p className="text-gray-600">Search Component</p>
            </div>
            <Search className="text-gray-400" size={24} />
          </Link>

          <Link
            to="/notification"
            className="flex items-center justify-between w-full px-6 py-4 text-left bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all duration-200"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Notifications
              </h2>
              <p className="text-gray-600">Notifications Component</p>
            </div>
            <Bell className="text-gray-400" size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
