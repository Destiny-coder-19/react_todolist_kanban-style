import React, { useState } from "react";
import { useTodoContext } from "../service/TodoContext";

function AddTodo() {
  const [getAddedItem, setAddedItem] = useState("");
  const { sendData, todos, setTodos } = useTodoContext();

  // functionality to add data in todo list
  const onAddItem = async () => {
    if (getAddedItem.trim()) {
      const newTodo = {
        todo: getAddedItem,
        completed: false,
        userId: todos.length + 1 || 1,
      };

      // If added successfully, update state
      const response = await sendData(
        "https://dummyjson.com/todos/add",
        "POST",
        newTodo
      );
      if (response?.id) {
        setTodos((prev) => [...prev, response]);
        setAddedItem("");
      }
    }
  };

  return (
    <div className="flex gap-2 items-center mb-4">
      <input
        type="text"
        placeholder="Add a new todo..."
        value={getAddedItem}
        onChange={(e) => setAddedItem(e.target.value)}
        className="border rounded p-2"
      />
      <button onClick={onAddItem} className="add-btn">
        Add
      </button>
    </div>
  );
}

export default AddTodo;
