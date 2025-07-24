import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({
  filteredLists,
  lists,
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
  return (
    <ul className="space-y-4">
      {filteredLists.length === 0 && (
        <li className={`${darkMode ? "text-gray-400 italic" : "text-white italic"}`}>
          No todos to show.
        </li>
      )}
      {filteredLists.map((list, index) => {
        const originalIndex = lists.findIndex((todo) => todo === list);
        return (
          <TodoItem
            key={originalIndex}
            list={list}
            index={originalIndex}
            darkMode={darkMode}
            editIndex={editIndex}
            editText={editText}
            setEditText={setEditText}
            saveEdit={saveEdit}
            cancelEditing={cancelEditing}
            startEditing={startEditing}
            handleDelete={handleDelete}
            handleUp={handleUp}
            handleDown={handleDown}
            handleTickedItem={handleTickedItem}
            handleEditKeyDown={handleEditKeyDown}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
