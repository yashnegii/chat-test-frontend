import UserContext from './context'
import { useContext} from "react";
export  function useUser() {
    return useContext(UserContext);
  }