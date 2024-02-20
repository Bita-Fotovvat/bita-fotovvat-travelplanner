import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setIsLoggedIn(!!token);
        if (token) {
            // Here you would ideally fetch user details from the backend
            // For simplicity, we are just assuming user is logged in
            setUser({ name: "User" }); // Placeholder for actual user data
        }
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
