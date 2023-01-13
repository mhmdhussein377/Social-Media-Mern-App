import React from 'react';
import {AiOutlineSearch, AiFillBell} from "react-icons/ai";
import {BsFillPersonFill, BsFillChatLeftDotsFill} from "react-icons/bs";
import DefaultImg from "./../../assets/person/noAvatar.png"
import {Link} from 'react-router-dom';
import "./Topbar.css";
import {useContext} from 'react';
import {AuthContext} from '../../Context/AuthContext';

const Topbar = () => {

    const {user} = useContext(AuthContext);

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/">
                    <span className="Logo">MhmdSocial</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <AiOutlineSearch className="searchIcon" size={25}/>
                    <input
                        type="text"
                        className="searchInput"
                        placeholder="Search for friend, post or video"/>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Home</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <BsFillPersonFill size={30}/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <BsFillChatLeftDotsFill size={25}/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <AiFillBell size={30}/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user?.username}`}>
                    <img src={user?.profilePicture || DefaultImg} alt="" className="topbarImg"/>
                </Link>
            </div>
        </div>
    );
}

export default Topbar