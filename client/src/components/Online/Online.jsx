import React from 'react'
import {BsDot} from 'react-icons/bs';
import {Link} from 'react-router-dom';
import DefaultImg from "./../../assets/person/noAvatar.png";
import "./Online.css";

const Online = ({username, profilePicture}) => {

    console.log("profilePicture")
    console.log(profilePicture);
    console.log("ProfilePicture")

    return (
        <Link to={`/profile/${username}`}>
            <li className="rightbarFriendItem">
                <div className="rightbarImgContainer">
                    <img
                        className="rightbarProfileImg"
                        src={profilePicture
                        ? `http://localhost:8080/images/${profilePicture}`
                        : DefaultImg}
                        alt="Person"/>
                    <div className="onlineIcon">
                        <BsDot color="limegreen" className="online" size={55}/>
                    </div>
                </div>
                <span className="onlineFriendName">{username}</span>
            </li>
        </Link>
    );
}

export default Online