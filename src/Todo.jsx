import React, { useState, useRef, useEffect } from "react";
import { Trash2, Edit2, Save } from "lucide-react";

function Todo() {
  const savedLists = JSON.parse(localStorage.getItem("tasks")) || [];
  const [lists, setLists] = useState(savedLists);
  const [items, setItems] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const editInputRef = useRef(null);

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

  // Edit handlers
  const startEditing = (index) => {
    setEditIndex(index);
    setEditText(lists[index].text);
  };

  const cancelEditing = () => {
    setEditIndex(null);
    setEditText("");
  };

  const saveEdit = () => {
    if (editText.trim() === "") return; // prevent empty todo
    const updatedLists = lists.map((item, i) =>
      i === editIndex ? { ...item, text: editText.trim() } : item
    );
    setLists(updatedLists);
    localStorage.setItem("tasks", JSON.stringify(updatedLists));
    setEditIndex(null);
    setEditText("");
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEditing();
    }
  };

  // Auto-focus edit input on entering edit mode
  useEffect(() => {
    if (editIndex !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editIndex]);

  return (
    <div className="min-h-screen bg-[#d5dccc] flex justify-center items-start pt-20 px-4 text-base sm:text-lg md:text-xl">
      <div className="bg-[#14534f] w-full max-w-[1000px] p-5 rounded-md border-2 border-[#04042a] shadow-md text-center">
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-6">TO DO LIST</h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 mb-6">
          <input
            id="enterList"
            type="text"
            placeholder="Enter your list..."
            value={items}
            onChange={handleInputChange}
            onKeyDown={handleKeyDownAdd}
            className="text-base sm:text-lg bg-white text-black px-4 py-2 rounded-md flex-1 min-w-[200px]"
          />
          <button
                 onClick={addItem}
                className="text-base sm:text-lg bg-white text-black px-4 py-2 rounded-md border border-transparent hover:border-white hover:bg-[#14534f] hover:text-white transition-colors duration-200"
           > 
               Add
           </button>
        </div>

        <ul className="space-y-4">
          {lists.map((list, index) => (
            <li key={index}>
              <div className="bg-[#ebe6e6] text-black rounded-md p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4 sm:max-w-[500px]">
                  <input
                    type="checkbox"
                    checked={list.isTicked}
                    onChange={() => handleTickedItem(index)}
                    className="w-6 h-6 cursor-pointer flex-shrink-0"
                  />

                  {editIndex === index ? (
                    <input
                      ref={editInputRef}
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={handleEditKeyDown}
                      onBlur={saveEdit}
                      className="text-base sm:text-lg md:text-xl px-2 py-1 rounded-md flex-grow"
                    />
                  ) : (
                    <div
                      className={`text-left break-words text-base sm:text-lg md:text-xl ${
                        list.isTicked ? "line-through" : ""
                      }`}
                    >
                      {list.text}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
                  {editIndex === index ? (
                    <>
                      <button
                        onClick={saveEdit}
                        aria-label="Save"
                        className="bg-[rgba(213,220,204,0.384)] text-black rounded-md border-2 border-black px-3 py-1 hover:bg-[#14534f] hover:text-white flex items-center justify-center"
                      >
                        <Save size={20} />
                      </button>
                      <button
                        onClick={cancelEditing}
                        aria-label="Cancel"
                        className="bg-[rgba(213,220,204,0.384)] text-black rounded-md border-2 border-black px-3 py-1 hover:bg-[#14534f] hover:text-white"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleDelete(index)}
                        aria-label="Delete"
                        className="bg-[rgba(213,220,204,0.384)] text-black rounded-md border-2 border-black px-3 py-1 hover:bg-[#14534f] hover:text-white flex items-center justify-center"
                      >
                        <Trash2 size={20} />
                      </button>
                      <button
                        onClick={() => handleUp(index)}
                        className="bg-[rgba(213,220,204,0.384)] text-black rounded-md border-2 border-black w-[40px] py-1 hover:bg-[#14534f] hover:text-white"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => handleDown(index)}
                        className="bg-[rgba(213,220,204,0.384)] text-black rounded-md border-2 border-black w-[40px] py-1 hover:bg-[#14534f] hover:text-white"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => startEditing(index)}
                        aria-label="Edit"
                        className="bg-[rgba(213,220,204,0.384)] text-black rounded-md border-2 border-black px-3 py-1 hover:bg-[#14534f] hover:text-white flex items-center justify-center"
                      >
                        <Edit2 size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
