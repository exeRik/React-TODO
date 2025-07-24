import React, { useRef, useEffect } from "react";
import { Trash2, Edit2, Save } from "lucide-react";

const TodoItem = ({
  list,
  index,
  darkMode,
  editIndex,
  editText,
  setEditText,
  saveEdit,
  cancelEditing,
  startEditing,
  handleDelete,
  handleUp,
  handleDown,
  handleTickedItem,
  handleEditKeyDown,
}) => {
  const editInputRef = useRef(null);

  useEffect(() => {
    if (editIndex === index && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editIndex, index]);

  return (
    <li>
      <div className={`rounded-md p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
        darkMode ? "bg-gray-700 text-white" : "bg-[#ebe6e6] text-black"
      }`}>
        <div className="flex items-center gap-4 sm:max-w-[500px] w-full">
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
              className={`text-base sm:text-lg md:text-xl px-2 py-1 rounded-md flex-grow min-w-0 ${
                darkMode ? "bg-gray-800 text-white" : ""
              }`}
            />
          ) : (
            <div className={`text-left break-words text-base sm:text-lg md:text-xl flex-grow min-w-0 ${
              list.isTicked ? "line-through" : ""
            }`}>
              {list.text}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
          {editIndex === index ? (
            <>
              <button onClick={saveEdit} className={`rounded-md border-2 px-3 py-1 flex items-center justify-center transition-colors duration-200 ${
                darkMode ? "bg-gray-400 text-gray-900 border-gray-400 hover:bg-gray-300" :
                "bg-[rgba(213,220,204,0.384)] text-black border-black hover:bg-[#14534f] hover:text-white"
              }`}>
                <Save size={20} />
              </button>
              <button onClick={cancelEditing} className={`rounded-md border-2 px-3 py-1 transition-colors duration-200 ${
                darkMode ? "bg-gray-400 text-gray-900 border-gray-400 hover:bg-gray-300" :
                "bg-[rgba(213,220,204,0.384)] text-black border-black hover:bg-[#14534f] hover:text-white"
              }`}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={() => handleDelete(index)} className={`rounded-md border-2 px-3 py-1 flex items-center justify-center transition-colors duration-200 ${
                darkMode ? "bg-gray-400 text-gray-900 border-gray-400 hover:bg-gray-300" :
                "bg-[rgba(213,220,204,0.384)] text-black border-black hover:bg-[#14534f] hover:text-white"
              }`}>
                <Trash2 size={20} />
              </button>
              <button onClick={() => handleUp(index)} className={`rounded-md border-2 w-[40px] py-1 transition-colors duration-200 ${
                darkMode ? "bg-gray-400 text-gray-900 border-gray-400 hover:bg-gray-300" :
                "bg-[rgba(213,220,204,0.384)] text-black border-black hover:bg-[#14534f] hover:text-white"
              }`}>
                ↑
              </button>
              <button onClick={() => handleDown(index)} className={`rounded-md border-2 w-[40px] py-1 transition-colors duration-200 ${
                darkMode ? "bg-gray-400 text-gray-900 border-gray-400 hover:bg-gray-300" :
                "bg-[rgba(213,220,204,0.384)] text-black border-black hover:bg-[#14534f] hover:text-white"
              }`}>
                ↓
              </button>
              <button onClick={() => startEditing(index)} className={`rounded-md border-2 px-3 py-1 flex items-center justify-center transition-colors duration-200 ${
                darkMode ? "bg-gray-400 text-gray-900 border-gray-400 hover:bg-gray-300" :
                "bg-[rgba(213,220,204,0.384)] text-black border-black hover:bg-[#14534f] hover:text-white"
              }`}>
                <Edit2 size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
