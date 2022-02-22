import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([{ text: "" }]);

  const add = async () => {
    await axios.post(`${process.env.REACT_APP_API}/add`, { text });
    setTodos([...todos, { text }]);
    setText("");
  };

  useEffect(() => {}, []);

  return (
    <div className="flex justify-center items-center px-4 py-4">
      <div>
        <h1 className="text-3xl font-bold">To Do List</h1>
        <div className="my-5 text-xl">
          {todos &&
            todos.map((todo, index) => (
              <div key={index}>
                <h1>{todo.text}</h1>
              </div>
            ))}
        </div>
        <div>
          <div>
            <input
              className="border px-2 py-2"
              type="text"
              placeholder="Add to do..."
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </div>
          <div className="my-2">
            <button
              className="px-2 py-2 bg-black text-white w-full"
              onClick={() => add()}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
