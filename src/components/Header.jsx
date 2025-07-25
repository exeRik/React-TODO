import React from "react";
import { Moon, Sun } from "lucide-react";

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="relative flex justify-center items-center mb-6">
      <h2 className="text-2xl sm:text-3xl font-bold">TO DO LIST</h2>
      <button
        onClick={toggleDarkMode}
        className={`absolute right-0 px-4 py-2 rounded-md font-semibold transition-colors duration-200
          ${darkMode ? "bg-gray-400 text-gray-900 hover:bg-gray-300" : "bg-gray-800 text-white hover:bg-gray-700"}`}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
};

export default Header;