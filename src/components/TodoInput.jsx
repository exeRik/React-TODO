import React from "react";

const TodoInput = ({ items, handleInputChange, handleKeyDownAdd, addItem, darkMode }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 mb-4">
      <input
        type="text"
        placeholder="Enter your list..."
        value={items}
        onChange={handleInputChange}
        onKeyDown={handleKeyDownAdd}
        className={`text-base sm:text-lg px-4 py-2 rounded-md flex-1 min-w-[200px] ${
          darkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-white text-black"
        }`}
      />
      <button
        onClick={addItem}
        className={`text-base sm:text-lg px-4 py-2 rounded-md border border-transparent transition-colors duration-200
          ${darkMode
            ? "bg-gray-400 text-gray-900 hover:bg-gray-300 hover:border-gray-300"
            : "bg-white text-black hover:border-white hover:bg-[#14534f] hover:text-white"
          }`}
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;
