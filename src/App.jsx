import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { UserProvider } from "./contexts/context";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Chatbar from "./components/Chatbar";
import ChatSection from "./components/ChatSection";
import { socket } from './socket'

function App() {
  socket.on('connect', ()=>{
    console.log('socket connection')
  })

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chatbar/>}>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/chat" element={<ChatSection/>}></Route>
          </Route>
        </Routes>
        <Routes>
          <Route path="/home" element={<Home/>}></Route>
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
    </UserProvider>
  );
}

export default App;
