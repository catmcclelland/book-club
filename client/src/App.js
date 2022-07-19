import "./App.css";
import InputBook from "./components/InputBook";
import ListBooks from "./components/ListToDos";

function App() {
  return (
    <div className="flex flex-col items-center w-full">
      <InputBook></InputBook>
      <ListBooks></ListBooks>
    </div>
  );
}

export default App;
