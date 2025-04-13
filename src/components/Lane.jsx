import React from "react";
import TodoCard from "./TodoCard";

// this component will be used in the board component to show the todo cards in a lane 
function Lane({ status, data, onDrop, onDragOver, onDragStart }) {
  return (
    <div onDrop={onDrop} onDragOver={onDragOver}>
      <h2 className="font-semibold mb-2">{status}</h2>
      {data.map((todo) => (
        <TodoCard key={todo.id} todo={todo} onDragStart={onDragStart} />
      ))}
    </div>
  );
}

export default Lane;
