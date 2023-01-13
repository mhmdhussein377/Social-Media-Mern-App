import React from 'react'
import "./CloseFriend.css";

const CloseFriend = ({profilePicture, username}) => {
    return (
        <li className="sidebarFriend">
            <img className="sidebarFriendImg" src={profilePicture} alt="/"/>
            <span className="sidebarFriendName">{username}</span>
        </li>
    );
}

export default CloseFriend