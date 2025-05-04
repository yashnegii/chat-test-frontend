
import { useState, createContext } from "react";
const UserContext = createContext(null);
// import { getSocket } from "../socket.js";


export function UserProvider({ children }) {
  // console.log(getSocket());
  const [socketInstance, setSocketInstance] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  return (
    <UserContext.Provider
      value={{
        email: email,
        setEmail: setEmail,
        password: password,
        setPassword: setPassword,
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,
        socket: socketInstance,
        setSocketInstance: setSocketInstance,
        activeChat: activeChat,
        setActiveChat: setActiveChat,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;