import React, {useState,useEffect} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useUser } from "../contexts/UseUser";

// import User from "../../../chat-test-backend/models/userSchema";

function ChatSection() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const {socket, email, activeChat} = useUser();
  const [acitveRoom, setActiveRoom] = useState(null);

  // console.log(socket)
  
  useEffect(() => {
    // Listen for broadcasted messages from the server
    if(!socket) return;
    socket.on("messageforwarded", (data) => {
      console.log(data);
      setActiveRoom(data.roomId);
      setMessages((prev) => [...prev, data.response]);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      socket.off("broadcast");
    };
  }, [socket]);


  useEffect(()=> {
    // console.log("getting messages from server")
    if(!socket) return;
    socket.emit("getMessages", { email, activeChat });
  },[setActiveRoom,socket,acitveRoom,activeChat,email])

  useEffect(()=>{
    if(!socket) return;
    
    socket.on("initalMessageGet", (data)=>{
      console.log("initial message", data)
      setMessages(data)
    })
  },[socket])


  function sendHandler(){ 
    const roomId = [email, activeChat].sort().join("_");
    socket.emit("message", { message, User: email, reciever: activeChat, roomId });
    setMessages((prev) => [...prev, { message, sender: email }]);
    setMessage("");
  }

  return (
    <section className="h-[87vh]">
      <div className="bg-cyan-50 h-[85%] overflow-scroll">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={`flex ${
                msg.sender === email ? "justify-end" : "justify-start"
              }`}
            >
                <div
                  className={`${
                    msg.sender === email
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 text-white"
                  } p-2 m-2 rounded-lg w-fit`}
                >
                  <p className="text-sm">{msg.sender}</p>
                  <p>{msg.message}</p>
                </div>
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
