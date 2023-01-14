import React, {useRef} from 'react'
import {useContext} from 'react';
import {AuthContext} from '../../Context/AuthContext';
import {loginCall} from '../../apiCalls';
import "./Login.css";
import {Link} from 'react-router-dom';

const Login = () => {

    const email = useRef();
    const password = useRef();
    const {dispatch, isFetching, error, user} = useContext(AuthContext);

    const handleSubmit = async(e) => {
        e.preventDefault();

        loginCall({
            email: email.current.value,
            password: password.current.value
        }, dispatch);
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
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input
                            type="Email"
                            required
                            name="email"
                            ref={email}
                            className="loginInput"
                            placeholder="Email"/>
                        <input
                            type="password"
                            minLength="6"
                            required
                            name="password"
                            ref={password}
                            placeholder="Password"
                            className="loginInput"/>
                        <button disabled={isFetching} className="loginButton" type="submit">
                            {isFetching
                                ? "Loading"
                                : "Log In"}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link to="/register">
                            <div className="loginRegisterButton">
                                {isFetching
                                    ? "Loading"
                                    : "Create a New Account"}
                            </div>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login