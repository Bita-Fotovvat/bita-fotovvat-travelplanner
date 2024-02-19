import './LoginPage.scss';
import Input from "../../components/Input/Input";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault();
       
        const login = async () => {
            try {
                //getting the token
                const { data } = await axios.post("http://localhost:8080/login", {
                    username: event.target.username.value,
                    password: event.target.password.value
                });
                
                console.log(data);
                // store the token for subsequent requests
                sessionStorage.setItem("token", data.token);
                navigate("/");
    
            } catch (error) {
                console.log(error);
            }
        }

        login();
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