import { createContext, useEffect, useState } from "react";
import api from "../utils/axiosInstance";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ← start as true

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/me");
        if (res.data.success) {
          setUser(res.data.data);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
