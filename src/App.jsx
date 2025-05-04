import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Chatbar from "./components/Chatbar";
import ChatSection from "./components/ChatSection";
import { useEffect } from "react";
import { connectSocket, getSocket } from "./socket.js";
import { useUser } from './contexts/UseUser.jsx';
// import { socket } from './socket'

function App() {
  // socket.on('connect', ()=>{
  //   console.log('socket connection')
  // })
  const { setSocketInstance, socket , setEmail, activeChat} = useUser();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      let tok = JSON.parse(token);
      connectSocket(tok.token);
      // Set the socket instance in the context
      setSocketInstance(getSocket());
      setEmail(tok.userId)
    }
  }, [setSocketInstance,setEmail]);

  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/chat" element={<Chatbar/>}>
            <Route path="/chat/personalchat" element={socket && activeChat?<ChatSection/>:<p>loading...</p>}></Route>
          </Route>
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          theme="colored"
          transition={Flip}
          limit={1}
        />
      </BrowserRouter>
   
  );
}

export default App;
