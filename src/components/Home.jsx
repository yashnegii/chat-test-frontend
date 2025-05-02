import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Home() {
  const [input, setInput] = useState("");
  const navigate= useNavigate();
  function addHandler() {
    fetch("http://localhost:3000/todo", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ text: input }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message) {
          toast.error("You are not authorized to do this action!");
          navigate("/")
        }
      });
  }
  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addHandler}>add</button>
    </div>
  );
}

export default Home;
