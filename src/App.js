import React, { useState, useEffect } from "react";
import axios from "axios";
require("dotenv").config();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([{ text: "" }]);

  const add = async () => {
    await axios.post(`${process.env.REACT_APP_API}/add`, { text });
    setTodos([...todos, { text }]);
    setText("");
    console.log(todos);
  };

  const clear = async () => {
    await axios.post(`${process.env.REACT_APP_API}/clear`);
    setTodos([{ text: "" }]);
    setText("");
    console.log(todos);
  };

  useEffect(() => {
    console.log(process.env);

    const getData = async () => {
      const info = await axios.get(`${process.env.REACT_APP_API}/get`);

      info.data.data.forEach((item) => {
        todos.push({ text: item.text });
      });
      console.log(todos);
      setIsLoading(false);
    };

    getData();
  }, []);

  if (isLoading) {
    return "Loading...";
  }

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
          <div className="my-2">
            <button
              className="px-2 py-2 bg-black text-white w-full"
              onClick={() => clear()}
            >
              CLEAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
