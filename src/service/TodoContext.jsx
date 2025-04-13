import React, { createContext, useContext, useState, useEffect } from "react";
import useApi from "../service/useApi";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { data, sendData } = useApi();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    sendData("https://dummyjson.com/todos", "GET");
  }, []);

  useEffect(() => {
    if (data?.todos?.length > 0) {
      setTodos(data.todos);
    }
  }, [data]);

  return (
    <TodoContext.Provider value={{ todos, setTodos, sendData, data }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
