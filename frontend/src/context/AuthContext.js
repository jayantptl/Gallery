import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();


export const AuthState = (props) => {
     const [user, setUser] = useState(null);

     // since this component is rendering first we can check here itself if user exists in local storage and update state
     // check once only so dependency array
     useEffect(() => {
          const chkUser = JSON.parse(localStorage.getItem('user'));
          if (chkUser) {
              const verifyUser=async()=>{
               const response = await fetch('/api/user/verify', {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${chkUser.token}`
                    }
                  })
              
                  const json = await response.json();       // we sent json as a response in post req check server post req
                  if (!response.ok) {
                    setUser(null);
                  }
                  else{
                    setUser(chkUser);
                  }
              }
             verifyUser();
          }
     }, [])


     return (

          <AuthContext.Provider value={{ user, setUser }}>
               {props.children}
          </AuthContext.Provider>
     )
}
