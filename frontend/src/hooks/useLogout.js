import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useLogout=()=>{
    const contObjU = useContext(AuthContext);


    const logout=()=>{
        // remove user (emil & token) from local storage 
        localStorage.removeItem('user');

        // mark the global state user null
        contObjU.setUser(null);
         
    }

    return {logout};
}