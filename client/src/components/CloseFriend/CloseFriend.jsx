import React, { useState } from 'react'
import DefaultImg from "./../../assets/person/noAvatar.png";
import "./CloseFriend.css";
import {Link} from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';

const CloseFriend = ({userId}) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(`http://localhost:8080/api/users?userId=${userId}`);
            setUser(res.data);
        };
        getUser();
    }, [userId]);

    const {username, profilePicture} = user;

    return (
        <Link to={`/profile/${username}`}>
            <li className="sidebarFriend">
                <img
                    className="sidebarFriendImg"
                    src={profilePicture
                    ? `http://localhost:8080/images/${profilePicture}`
                    : DefaultImg}
                    alt="/"/>
                <span className="sidebarFriendName">{username}</span>
            </li>
        </Link>
    );
}

export default CloseFriend