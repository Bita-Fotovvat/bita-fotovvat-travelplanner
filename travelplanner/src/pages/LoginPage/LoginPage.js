import './LoginPage.scss';
import Input from "../../components/Input/Input";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const loginUser = async () => {
            try {
                const { data } = await axios.post("http://localhost:8080/users/login", {
                    username: event.target.username.value,
                    password: event.target.password.value
                });
                
                console.log(`This is what we want: `, data.userid);
                login(data); 
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("userid", data.userid);
                navigate("/");
    
            } catch (error) {
                console.log(error);
            }
        }
        loginUser();
    };
    return (
        <main className="login-page">
            <form className="login" onSubmit={handleSubmit}>
                <h1 className="login__title">Log in</h1>
                <Input type="text" name="username" label="Username" />
                <Input type="password" name="password" label="Password" />
                <button className="login__button">
                    Log in
                </button>
            </form>
        </main>
    );
}