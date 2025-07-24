

// export default Todo;
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import FilterButtons from "./components/FilterButtons";
import TodoList from "./components/TodoList";

function Todo() {
  const savedDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
  const [darkMode, setDarkMode] = useState(savedDarkMode);

  const savedLists = JSON.parse(localStorage.getItem("tasks")) || [];
  const [lists, setLists] = useState(savedLists);
  const [items, setItems] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const filteredLists = lists.filter((todo) =>
    filter === "completed" ? todo.isTicked :
    filter === "pending" ? !todo.isTicked : true
  );

  const handleInputChange = (e) => setItems(e.target.value);
  const addItem = () => {
    const newValue = items.trim();
    if (newValue !== "") {
      const updated = [...lists, { text: newValue, isTicked: false }];
      setLists(updated);
      localStorage.setItem("tasks", JSON.stringify(updated));
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
    const updated = lists.filter((_, i) => i !== index);
    setLists(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
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
    const updated = lists.map((item, i) =>
      i === editIndex ? { ...item, text: editText.trim() } : item
    );
    setLists(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    setEditIndex(null);
    setEditText("");
  };
  const handleEditKeyDown = (e) => {
    if (e.key === "Enter") saveEdit();
    else if (e.key === "Escape") cancelEditing();
  };
  const handleKeyDownAdd = (e) => {
    if (e.key === "Enter") addItem();
  };

  return (
    <div className={`min-h-screen flex justify-center items-center px-4 text-base sm:text-lg md:text-xl ${
      darkMode ? "bg-gray-900 text-white" : "bg-[#d5dccc] text-black"
    }`}>
      <div className={`w-full max-w-[1000px] h-[610px] overflow-y-auto p-5 rounded-md border-2 shadow-md text-center ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-[#14534f] border-[#04042a] text-white"
      }`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <TodoInput
          items={items}
          handleInputChange={handleInputChange}
          handleKeyDownAdd={handleKeyDownAdd}
          addItem={addItem}
          darkMode={darkMode}
        />
        <FilterButtons
          filter={filter}
          setFilter={setFilter}
          clearAll={clearAll}
          darkMode={darkMode}
        />
        <TodoList
          filteredLists={filteredLists}
          lists={lists}
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
      </div>
    </div>
  );
}

export default Todo;
