import { useState } from "react";
import "./App.css";
import Header from "./shared/header/Header";
import Board from "./components/Board";
import { TodoProvider } from "./service/TodoContext";

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <TodoProvider>
          <Board />
        </TodoProvider>
      </main>
    </>
  );
}

export default App;
