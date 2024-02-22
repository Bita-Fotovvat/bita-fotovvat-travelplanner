import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = sessionStorage.getItem("token");
            if (!token) {
                setIsLoggedIn(false);
                setUser(null);
                return;
            }

            try {
                const { data } = await axios.get("http://localhost:8080/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIsLoggedIn(true);
                setUser(data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setIsLoggedIn(false);
                setUser(null);
            }
        };

        fetchUserProfile();
    }, []);

    const logout = () => {
        sessionStorage.removeItem("token");
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
