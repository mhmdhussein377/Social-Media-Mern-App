import React from 'react'
import { BsDot } from 'react-icons/bs';
import "./Online.css";

const Online = ({username, profilePicture}) => {
    return (
        <li className="rightbarFriendItem">
            <div className="rightbarImgContainer">
                <img className="rightbarProfileImg" src={profilePicture} alt="Person"/>
                <div className="onlineIcon">
                    <BsDot color="limegreen" className="online" size={55}/>
                </div>
            </div>
            <span className="onlineFriendName">{username}</span>
        </li>
    );
}

export default Online