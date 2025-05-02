import { useState, createContext } from "react";
const UserContext = createContext(null);
import { socket } from '../socket'


export function UserProvider({ children }) {
  socket.on('connect', ()=>{
    console.log('socket connection')
  })
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <UserContext.Provider
      value={{
        email: email,
        setEmail: setEmail,
        password: password,
        setPassword: setPassword,
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,
        socket: socket,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;