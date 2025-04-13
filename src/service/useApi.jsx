import { useState } from "react";

// Custom hook to handle all API
function useApi() {
  const [data, setData] = useState({ todos: [] });

  const sendData = async (url, method, body = null) => {
    let response;
    try {
      // Prepare fetch options based on method type
      if (method === "GET" || method === "DELETE") {
        response = await fetch(url, { method });
      } else if (method === "POST" || method === "PUT") {
        response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      }

      // Parse the response data
      const result = await response.json();

      if (method === "GET") {
        // Replace full todo list
        setData({ todos: result.todos || [] });
      } else if (method === "POST") {
        // Append new todo to existing list
        setData((previous) => ({
          todos: [...(previous?.todos || []), result],
        }));
      } else {
        // For PUT and DELETE, update or remove from the list
        setData((previous) => {
          if (!previous || !previous.todos) return { todos: [result] };

          const updatedTodos = previous.todos.map((item) =>
            item.id === result.id ? { ...item, ...result } : item
          );
          return { todos: updatedTodos };
        });
      }

      return result;
    } catch (error) {
      console.error("Api Error:", error);
    }
  };
  return { data, sendData };
}

export default useApi;
