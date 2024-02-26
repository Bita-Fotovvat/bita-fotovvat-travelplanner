import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DashboardPage.scss";
import axios from "axios";
import FavouritesList from "../../components/FavouritesList/FavouritesList";

export default function DashboardPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
        const getCurrentUser = async () => {
            try {
                const { data } = await axios.get("http://localhost:8080/users/profile", {
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
            <section className="profile__container">
                <div className="profile__imageholder"></div>
                    <h1 className="profile__title"> Profile </h1>
                    <p className="profile__greeting">Welcome, {user.name}!</p>
                    <h3 className="profile__favheader">Your Favourites: </h3>
                <FavouritesList />
            </section>
            <button  className="profile__logout" onClick={handleLogout}>
                Log out
            </button>
        </main>
    )
}