import React, { useEffect, useState } from 'react'
import Feed from '../../components/Feed/Feed';
import Rightbar from '../../components/Rightbar/Rightbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import DefaultCover from "./../../assets/person/noCover.png";
import DefaultImg from "./../../assets/person/noAvatar.png";
import "./Profile.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {

    const [user,
        setUser] = useState({});
    const username = useParams().username;
    const {coverPicture, profilePicture} = user;

    useEffect(() => {
        const getUser = async() => {
            const res = await axios(`http://localhost:8080/api/users?username=${username}`);
            setUser(res.data);
        };
        getUser();
        console.log(user);
    }, [username]);

    console.log(user)

    return (
        <div>
            <Topbar/>
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImg" src={user?.coverPicture ? `http://localhost:8080/images/${user?.coverPicture}` : DefaultCover} alt="coverImg"/>
                            <img className='profileImg' src={user?.profilePicture ? `http://localhost:8080/images/${user?.profilePicture}` : DefaultImg} alt="profileImg"/>
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user?.username}</h4>
                            <span className="profileInfoDesc">{user?.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile