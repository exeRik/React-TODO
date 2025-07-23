import React, { useState, useRef, useEffect } from "react";
import { Trash2, Edit2, Save, Moon, Sun } from "lucide-react";

function Todo() {
  const savedDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
  const [darkMode, setDarkMode] = useState(savedDarkMode);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const savedLists = JSON.parse(localStorage.getItem("tasks")) || [];
  const [lists, setLists] = useState(savedLists);
  const [items, setItems] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");
  const editInputRef = useRef(null);

  const filteredLists = lists.filter((todo) => {
    if (filter === "completed") return todo.isTicked;
    if (filter === "pending") return !todo.isTicked;
    return true;
  });

  const handleInputChange = (e) => setItems(e.target.value);

  const addItem = () => {
    const newValue = items.trim();
    if (newValue !== "") {
      const updatedLists = [...lists, { text: newValue, isTicked: false }];
      setLists(updatedLists);
      localStorage.setItem("tasks", JSON.stringify(updatedLists));
      setItems("");
    }
  };

  const clearAll = () => {
    setLists([]);
    localStorage.setItem("tasks", JSON.stringify([]));
    setEditIndex(null);
    setEditText("");
  };

  const handleDelete = (index) => {
    const updatedLists = lists.filter((_, i) => i !== index);
    setLists(updatedLists);
    localStorage.setItem("tasks", JSON.stringify(updatedLists));
    if (editIndex === index) {
      setEditIndex(null);
      setEditText("");
    }
  };

  const handleUp = (index) => {
    if (index > 0) {
      const newList = [...lists];
      [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]];
      setLists(newList);
      localStorage.setItem("tasks", JSON.stringify(newList));
      if (editIndex === index) setEditIndex(index - 1);
    }
  };

  const handleDown = (index) => {
    if (index < lists.length - 1) {
      const newList = [...lists];
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
      setLists(newList);
      localStorage.setItem("tasks", JSON.stringify(newList));
      if (editIndex === index) setEditIndex(index + 1);
    }
  };

  const handleKeyDownAdd = (e) => {
    if (e.key === "Enter") addItem();
  };

  const handleTickedItem = (index) => {
    const updated = lists.map((item, i) =>
      i === index ? { ...item, isTicked: !item.isTicked } : item
    );
    setLists(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditText(lists[index].text);
  };

  const cancelEditing = () => {
    setEditIndex(null);
    setEditText("");
  };

  const saveEdit = () => {
    if (editText.trim() === "") return;
    const updatedLists = lists.map((item, i) =>
      i === editIndex ? { ...item, text: editText.trim() } : item
    );
    setLists(updatedLists);
    localStorage.setItem("tasks", JSON.stringify(updatedLists));
    setEditIndex(null);
    setEditText("");
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter") saveEdit();
    else if (e.key === "Escape") cancelEditing();
  };

  useEffect(() => {
    if (editIndex !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editIndex]);

  return (
    <div
       className={`min-h-screen flex justify-center items-center px-4 text-base sm:text-lg md:text-xl ${
       darkMode ? "bg-gray-900 text-white" : "bg-[#d5dccc] text-black"
    }`}
    >
      <div
        className={`w-full max-w-[1000px] h-[610px] overflow-y-auto p-5 rounded-md border-2 shadow-md text-center
          ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-[#14534f] border-[#04042a] text-white"
          }`}
      >
        <div className="relative flex justify-center items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold">TO DO LIST</h2>
              <button
                onClick={toggleDarkMode}
                className={`absolute right-0 px-4 py-2 rounded-md font-semibold transition-colors duration-200
                  ${
                    darkMode
                      ? "bg-gray-400 text-gray-900 hover:bg-gray-300"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 mb-4">
          <input
            id="enterList"
            type="text"
            placeholder="Enter your list..."
            value={items}
            onChange={handleInputChange}
            onKeyDown={handleKeyDownAdd}
            className={`text-base sm:text-lg px-4 py-2 rounded-md flex-1 min-w-[200px] ${
              darkMode
                ? "bg-gray-700 text-white placeholder-gray-400"
                : "bg-white text-black"
            }`}
          />
          <button
            onClick={addItem}
            className={`text-base sm:text-lg px-4 py-2 rounded-md border border-transparent transition-colors duration-200
              ${
                darkMode
                  ? "bg-gray-400 text-gray-900 hover:bg-gray-300 hover:border-gray-300"
                  : "bg-white text-black hover:border-white hover:bg-[#14534f] hover:text-white"
              }`}
          >
            Add
          </button>
        </div>

        {/* Filter + Clear All */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {["all", "completed", "pending"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-md font-semibold transition-colors duration-200
                ${
                  filter === f
                    ?darkMode
                     ? "bg-gray-700 text-white placeholder-gray-400"
                     : "bg-white text-black"
                    : darkMode
                    ? "bg-gray-700 text-gray-400 hover:bg-gray-400 hover:text-gray-900"
                    : "bg-[#c9d1c9] text-[#14555f] hover:bg-white hover:text-[#14534f]"
                }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}

          <button
            onClick={clearAll}
            className={`px-4 py-1 rounded-md font-semibold transition-colors duration-200
              ${
                darkMode
                  ? "bg-gray-700 text-gray-400 hover:bg-gray-400 hover:text-gray-900"
                    : "bg-[#c9d1c9] text-[#14555f] hover:bg-white hover:text-[#14534f]"
              }`}
          >
           Clear All
          </button>
        </div>

        {/* Todo list */}
        <ul className="space-y-4">
          {filteredLists.length === 0 && (
            <li className={`${darkMode ? "text-gray-400 italic" : "text-white italic"}`}>
              No todos to show.
            </li>
          )}

          {filteredLists.map((list, index) => {
            const originalIndex = lists.findIndex((todo) => todo === list);
            return (
              <li key={originalIndex}>
                <div
                  className={`rounded-md p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
                    ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-[#ebe6e6] text-black"
                    }`}
                >
                  <div className="flex items-center gap-4 sm:max-w-[500px] w-full">
                    <input
                      type="checkbox"
                      checked={list.isTicked}
                      onChange={() => handleTickedItem(originalIndex)}
                      className="w-6 h-6 cursor-pointer flex-shrink-0"
                    />

                    {editIndex === originalIndex ? (
                      <input
                        ref={editInputRef}
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={handleEditKeyDown}
                        onBlur={saveEdit}
                        className={`text-base sm:text-lg md:text-xl px-2 py-1 rounded-md flex-grow min-w-0 ${
                          darkMode ? "bg-gray-800 text-white" : ""
                        }`}
                      />
                    ) : (
                      <div
                        className={`text-left break-words text-base sm:text-lg md:text-xl flex-grow min-w-0 ${
                          list.isTicked ? "line-through" : ""
                        }`}
                      >
                        {list.text}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
                    {editIndex === originalIndex ? (
                      <>
                        <button
                          onClick={saveEdit}
                          className={`rounded-md border-2 px-3 py-1 flex items-center justify-center transition-colors duration-200 ${
                            darkMode
                              ? "bg-gray-400 text-gray-900 border-gray-400 hover:bg-gray-300"
                              : "bg-[rgba(213,220,204,0.384)] text-black border-black hover:bg-[#14534f] hover:text-white"
                          }`}
                        >
                          <Save size={20} />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className={`rounded-md border-2 px-3 py-1 transition-colors duration-200 ${
                            darkMode
                              ? "bg-gray-400 text-gray-900 border-gray-400 hover:bg-gray-300"
                              : "bg-[rgba(213,220,204,0.384)] text-black border-black hover:bg-[#14534f] hover:text-white"
                          }`}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleDelete(originalIndex)}
                          className={`rounded-md border-2 px-3 py-1 flex items-center justify-center transition-colors duration-200 ${
                            darkMode
                              ? "bg-gray-400 text-gray-900 border-gray-400 hover:bg-gray-300"
                              : "bg-[rgba(213,220,204,0.384)] text-black border-black hover:bg-[#14534f] hover:text-white"
                          }`}
                        >
                          <Trash2 size={20} />
                        </button>
                        <button
                          onClick={() => handleUp(originalIndex)}
                          className={`rounded-md border-2 w-[40px] py-1 transition-colors duration-200 ${
                            darkMode
                              ? "bg-gray-400 text-gray-900 border-gray-400 hover:bg-gray-300"
                              : "bg-[rgba(213,220,204,0.384)] text-black border-black hover:bg-[#14534f] hover:text-white"
                          }`}
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => handleDown(originalIndex)}
                          className={`rounded-md border-2 w-[40px] py-1 transition-colors duration-200 ${
                            darkMode
                              ? "bg-gray-400 text-gray-900 border-gray-400 hover:bg-gray-300"
                              : "bg-[rgba(213,220,204,0.384)] text-black border-black hover:bg-[#14534f] hover:text-white"
                          }`}
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => startEditing(originalIndex)}
                          className={`rounded-md border-2 px-3 py-1 flex items-center justify-center transition-colors duration-200 ${
                            darkMode
                              ? "bg-gray-400 text-gray-900 border-gray-400 hover:bg-gray-300"
                              : "bg-[rgba(213,220,204,0.384)] text-black border-black hover:bg-[#14534f] hover:text-white"
                          }`}
                        >
                          <Edit2 size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
