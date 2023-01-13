import axios from 'axios';
import React from 'react'
import {useContext} from 'react';
import {useEffect} from 'react';
import {useRef} from 'react';
import {AuthContext} from '../../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import "./Register.css"

const Register = () => {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate();

    const handleRegister = async(e) => {
        e.preventDefault();

        if (password.current.value !== confirmPassword.current.value) {
            confirmPassword
                .current
                .setCustomValidity("Passwords don't match!")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post("http://localhost:8080/api/auth/register", user);
                navigate("/login", {replace: true});
            } catch (error) {
                console.log(error);
            }
        }

    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="logo">MhmdSocial</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on MhmdSocial.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleRegister}>
                        <input
                            ref={username}
                            required
                            type="text"
                            placeholder='Username'
                            className='loginInput'/>
                        <input
                            ref={email}
                            required
                            type="email"
                            className="loginInput"
                            placeholder="Email"/>
                        <input
                            ref={password}
                            minLength="6"
                            required
                            type="password"
                            placeholder="Password"
                            className="loginInput"/>
                        <input
                            ref={confirmPassword}
                            required
                            type="password"
                            placeholder='Confirm Password'
                            className='loginInput'/>
                        <button className="loginButton" type='submit'>Sign Up</button>
                        <button className="loginRegisterButton">
                            Log into an Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register