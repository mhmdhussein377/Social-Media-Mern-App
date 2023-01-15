import React, { useState } from 'react';
import {BiWifi} from "react-icons/bi";
import {BsFillChatLeftTextFill, BsFillBookmarkFill, BsCalendar2Event} from "react-icons/bs";
import {MdSlowMotionVideo, MdGroup} from "react-icons/md";
import {AiOutlineQuestionCircle} from "react-icons/ai";
import {TfiBag} from "react-icons/tfi";
import {SiSololearn} from "react-icons/si";
import {AuthContext} from "./../../Context/AuthContext";
import "./Sidebar.css";
import { Users } from '../../DummyData';
import CloseFriend from '../CloseFriend/CloseFriend';
import { useContext } from 'react';
import { useEffect } from 'react';
import axios from "axios";

const Sidebar = () => {

    const {user} = useContext(AuthContext);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        setFriends(user.following);
    }, [user?.following]);

    console.log("friends");
    console.log(friends);

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <BiWifi size={25}/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <BsFillChatLeftTextFill size={25}/>
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <MdSlowMotionVideo size={25}/>
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <MdGroup size={25}/>
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <BsFillBookmarkFill size={25}/>
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <AiOutlineQuestionCircle size={25}/>
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <TfiBag size={25}/>
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <BsCalendar2Event size={25}/>
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <SiSololearn size={25}/>
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                    <li className="sidebarListItem">
                        <button className="sidebarListItemButton">Show More</button>
                    </li>
                </ul>
                <hr className="sidebarHr"/>
                <ul className="sidebarFriendList">
                    {friends.map((userId, index) => (
                        <CloseFriend userId={userId} key={index} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar