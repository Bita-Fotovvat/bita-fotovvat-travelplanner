import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DashboardPage.scss";
import axios from "axios";

export default function DashboardPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);



    useEffect(() => {
        //get a token from sessionstorage
        const token = sessionStorage.getItem("token");

        if (token) {
            //tell the app user is logged in
            setIsLoggedIn(true);
        }

        const getCurrentUser = async () => {
            try {
                const { data } = await axios.get("http://localhost:8080/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(data);
                setUser(data);
            } catch (error) {
                console.log(error);
            }
        }

        getCurrentUser();

    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        setUser(null);
        setIsLoggedIn(false);
    };

    if (!isLoggedIn) {
        return (
            <main> 
                Please log in to have access to your profile.
                <Link to="/login"> Log In</Link>
            </main>
        )
    }

    if (!user) {
        return (
            <main> 
                loading...
            </main>
        )
    }

    return (
        <main className="profile">
            <h1 className="profile__title"> Profile </h1>
            <p className="profile__greeting">Welcome, {user.name}!</p>
            <h3 className="profile__favheader">Your Favourites: </h3>
            <div className="profile__favourites"></div>
            <button  className="profile__logout" onClick={handleLogout}>
                Log out
            </button>
        </main>
    )
}