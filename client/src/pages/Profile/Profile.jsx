import React, {useEffect, useState} from 'react'
import Feed from '../../components/Feed/Feed';
import Rightbar from '../../components/Rightbar/Rightbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import DefaultCover from "./../../assets/person/noCover.png";
import DefaultImg from "./../../assets/person/noAvatar.png";
import "./Profile.css";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../../Context/AuthContext';

const Profile = () => {

    const [user,
        setUser] = useState({});
    const username = useParams().username;
    const [file,
        setFile] = useState(null);
    const [coverFile,
        setCoverFile] = useState(null);
    const {user: currentUser, dispatch} = useContext(AuthContext);

    // const changeFile = (e) => {     setFile(e.target.files[0]); }

    useEffect(() => {
        const getUser = async() => {
            const res = await axios(`http://localhost:8080/api/users?username=${username}`);
            setUser(res.data);
        };
        getUser();
        console.log(user);
    }, [username]);

    useEffect(() => {
        const handlePP = async(e) => {
            let data;

            if (file) {
                data = new FormData();
                const filename = Date.now() + file.name;
                data.append("name", filename);
                data.append("file", file);

                try {
                    await axios.post("http://localhost:8080/api/upload", data);
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }

                console.log("file");
                console.log("file");
                console.log(file);

                try {
                    await axios.put(`http://localhost:8080/api/users/${currentUser._id}`, {
                        profilePicture: filename,
                        userId: currentUser._id
                    });
                    dispatch({type: "CHANGE_PP", payload: filename});
                    window
                        .location
                        .reload();
                } catch (error) {
                    console.log(error);
                }
            }
        };
        handlePP();
    }, [file]);

    useEffect(() => {
        const handleCP = async(e) => {
            let data;

            if (coverFile) {
                data = new FormData();
                const filename = Date.now() + coverFile.name;
                data.append("name", filename);
                data.append("file", coverFile);

                try {
                    await axios.post("http://localhost:8080/api/upload", data);
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }

                console.log("file");
                console.log("file");
                console.log(file);

                try {
                    await axios.put(`http://localhost:8080/api/users/${currentUser._id}`, {
                        coverPicture: filename,
                        userId: currentUser._id
                    });
                    dispatch({type: "CHANGE_CP", payload: filename})
                    window
                        .location
                        .reload();
                } catch (error) {
                    console.log(error);
                }
            }
        };
        handleCP();
    }, [coverFile]);

    return (
        <div>
            <Topbar/>
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <label htmlFor="cp" className='cpLabel'>
                                <img
                                    className="profileCoverImg"
                                    src={user
                                    ?.coverPicture
                                        ? `http://localhost:8080/images/${user
                                            ?.coverPicture}`
                                            : DefaultCover}
                                    alt="coverImg" style={{cursor: "pointer"}}/>
                            </label>
                            <label htmlFor="pp">
                                <img
                                    className="profileImg"
                                    src={user
                                    ?.profilePicture
                                        ? `http://localhost:8080/images/${user
                                            ?.profilePicture}`
                                            : DefaultImg}
                                    alt="profileImg"
                                    style={{
                                    cursor: "pointer"
                                }}/>
                            </label>
                            {user
                                ?._id === currentUser._id && (<input
                                    onChange={(e) => setFile(e.target.files[0])}
                                    type="file"
                                    accept='.png, .jpeg, .jpg'
                                    id="pp"
                                    style={{
                                    display: "none"
                                }}/>)}
                            {user
                                ?._id === currentUser._id && (<input
                                    onChange={(e) => setCoverFile(e.target.files[0])}
                                    type="file"
                                    id="cp"
                                    style={{
                                    display: "none"
                                }}/>)}
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user
                                    ?.username}</h4>
                            <span className="profileInfoDesc">{user
                                    ?.desc}</span>
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