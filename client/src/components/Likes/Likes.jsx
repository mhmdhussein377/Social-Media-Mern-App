import React, {useState} from 'react'
import {useEffect} from 'react';
import {BiArrowBack} from "react-icons/bi";
import UserImg from "./../../assets/person/noAvatar.png"
import {useParams, useNavigate, Link} from 'react-router-dom';
import "./Likes.css";
import axios from 'axios';

const Likes = () => {

    const {postId} = useParams();
    const navigate = useNavigate();
    let [likers,
        setLikers] = useState([]);

    useEffect(() => {
        const getLikes = async() => {
            const res = await axios.get(`http://localhost:8080/api/posts/post/${postId}/likes`);
            setLikers(res.data);
        };
        getLikes();
    }, [postId]);

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div className="likes">
            <div className="likesWrapper">
                <div className="likesTop">
                    <BiArrowBack className="backIcon" size={25} onClick={handleBack}/>
                    <h1>People who liked the post</h1>
                </div>
                <div className="likedUsers">
                    {likers.map((liker, index) => (
                        <Link to={`/profile/${liker.username}`} key={index}>
                            <div className="likedUser">
                                <img
                                    src={liker.profilePicture
                                    ? `http://localhost:8080/images/${liker.profilePicture}`
                                    : UserImg}
                                    className="likedUserImg"
                                    alt="profilePic"/>
                                <p className="likedUsername">{liker.username}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Likes