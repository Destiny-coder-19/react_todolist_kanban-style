import React, { useCallback } from "react";
import { useTodoContext } from "../service/TodoContext";

const url = "https://dummyjson.com/todos";

function TodoCard({ todo, onDragStart }) {
  const { sendData } = useTodoContext();

  const onUpdateItem = useCallback(
    (e) => {
      const isChecked = e.target.checked;
      sendData(`${url}/${todo.id}`, "PUT", { completed: isChecked });
    },
    [todo.id, sendData]
  );

  // Memoized function for checkbox toggle
  const onPendingItem = useCallback(
    (e) => {
      const isChecked = e.target.checked;
      sendData(`${url}/${todo.id}`, "PUT", { completed: isChecked });
    },
    [todo.id, sendData]
  );

  // Memoized delete function
  const onDeleteItem = useCallback(() => {
    sendData(`${url}/${todo.id}`, "DELETE");
  }, [todo.id, sendData]);

  return (
    <div
      className="card board-container flex-center"
      draggable
      onDragStart={() => onDragStart(todo.id)}
    >
      {!todo.completed && (
        <>
          <div className="flex-center">
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={todo.completed}
              onChange={onUpdateItem}
              id={`todo-${todo.id}`}
            />
            <label htmlFor={`todo-${todo.id}`}>{todo.todo}</label>
          </div>
          <div>
            <button className="text-red" onClick={onDeleteItem}>
              Delete
            </button>
          </div>
        </>
      )}
      {todo.completed && (
        <>
          <div className="flex-center">
            <input
              type="checkbox"
              className="custom-checkbox"
              onChange={onPendingItem}
              checked={todo.completed}
              id={`todo-${todo.id}`}
            />
            <label htmlFor={`todo-${todo.id}`}>{todo.todo}</label>
          </div>
          <div>
            <button className="text-red" onClick={onDeleteItem}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Memoized component to prevent unnecessary re-renders
export default React.memo(TodoCard);
