import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AUTH_BASR_URL } from "../Services/consfig.js"; // ✅ correct path

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const[loading, setLoading] = useState()

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.post(
          `${AUTH_BASR_URL}/check`,
          {},
          { withCredentials: true } 
        );
        console.log("Auth check responce",res.data )
        if(res.data && res.data.user){
          setUser(res.data);
        setUserLoggedIn(true);
        }
      } catch {
        setUser(null);
        setUserLoggedIn(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <AuthContext.Provider value={{ userLoggedIn, setUserLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
