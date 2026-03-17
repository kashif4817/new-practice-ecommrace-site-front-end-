// src/context/UserContext.js
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/auth/me", {
                    method: "GET",
                    credentials: "include",
                });

                const result = await response.json();
                if (response.ok) {
                    setUser(result.data);
                    console.log(result.data);
                    toast.success("User fetch in react context");
                }
            } catch (error) {
                console.error(error);
                toast.error("an error occur in react context");
            }
        };
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
