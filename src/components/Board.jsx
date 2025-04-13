import React, { useState } from "react";
import Lane from "./Lane";
import AddTodo from "./AddTodo";
import { useTodoContext } from "../service/TodoContext";

const statuses = ["Pending", "Completed"];

function Board() {
  const { todos, setTodos, sendData } = useTodoContext();
  const [draggedTodoId, setDraggedTodoId] = useState(null);

  // handle drag and drop functionality with the api call
  const patchData = (url, body) => sendData(url, "PUT", body);
  
  const handleDrop = (status) => {
    if (!draggedTodoId) return;

    const updatedTodos = todos.map((todo) =>
      todo.id === draggedTodoId
        ? { ...todo, completed: status === "Completed" }
        : todo
    );
    setTodos(updatedTodos);

    patchData(`https://dummyjson.com/todos/${draggedTodoId}`, {
      completed: status === "Completed",
    });

    setDraggedTodoId(null);
  };

  return (
    <div className="text-center">
      <AddTodo />
      <div className="board-container">
        {statuses.map((status) => {
          const filteredTodos = todos.filter(
            (todo) =>
              !todo.isDeleted &&
              (status === "Completed" ? todo.completed : !todo.completed)
          );

          return (
            <Lane
              key={status}
              status={status}
              data={filteredTodos}
              onDrop={() => handleDrop(status)}
              onDragOver={(e) => e.preventDefault()}
              onDragStart={setDraggedTodoId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Board;
