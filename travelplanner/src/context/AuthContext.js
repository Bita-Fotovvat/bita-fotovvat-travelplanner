import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(sessionStorage.getItem("userid")); // Initialize from session storage


    /////////////////////////////////NEW
    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        setUserId(userData.userid); // Assuming the userID is part of the userData object
        sessionStorage.setItem("token", userData.token);
        sessionStorage.setItem("userid", userData.userid);
    };
    ///////////////////////////////////////

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = sessionStorage.getItem("token");
            if (!token) {
                setIsLoggedIn(false);
                setUser(null);
                setUserId(null); // Reset userId when there's no token
                return;
            }

            try {
                const { data } = await axios.get("http://localhost:8080/users/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(data.userid);
                setIsLoggedIn(true);
                setUser(data);
                setUserId(data.userid); // Save the userid from response
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setIsLoggedIn(false);
                setUser(null);
                setUserId(null); // Reset userId on error
            }
        };

        fetchUserProfile();
    }, []);

    const logout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userid"); // Make sure to remove userId from session storage
        setIsLoggedIn(false);
        setUser(null);
        setUserId(null); // Reset userId on logout
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, userId, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};
