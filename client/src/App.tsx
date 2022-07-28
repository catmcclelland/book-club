import "./App.css";
import React from "react";
import InputBook from "./components/InputBook";
import ListBooks from "./components/ListToDos";

function App() {
  return (
    <div className="flex flex-col items-center w-full">
      <InputBook />
      <ListBooks />
    </div>
  );
}

export default App;
