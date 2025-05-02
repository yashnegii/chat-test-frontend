import React, {useState,useEffect} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useUser } from "../contexts/UseUser";

function ChatSection() {
  const { socket } = useUser();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for broadcasted messages from the server
    socket.on("broadcast", (data) => {
      console.log("Message from server:", data);
      setMessages((prev) => [...prev, data]);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      socket.off("broadcast");
    };
  }, [socket]);

  function sendHandler(){ 
    socket.emit("message", message);
    setMessage("");
  }

  return (
    <section className="h-screen">
      <div className="bg-cyan-50 h-[70%] overflow-scroll">
        {messages.map((msg, index) => {
          return (
            <div key={index} className="flex justify-start">
              <div className="bg-blue-500 text-white p-2 m-2 rounded-lg w-fit">{msg}</div>
            </div>
          );
        })}
      </div>
      <Box
        component="div"
        sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
        noValidate
        autoComplete="off"
      >
        <TextField value={message} onChange={(e)=>setMessage(e.target.value)} id="outlined-basic" label="Type your message..." variant="outlined" />
        <button className="bg-blue-700 p-2 text-white" onClick={sendHandler}>send</button>
      </Box>
    </section>
  );
}

export default ChatSection;
