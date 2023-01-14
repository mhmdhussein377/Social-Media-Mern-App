import React, {useState} from 'react';
import {BiDotsVerticalRounded} from "react-icons/bi";
import Image from "./../../assets/person/1.jpeg";
import PostImg from "./../../assets/post/1.jpeg";
import Like from "./../../assets/like.png";
import Heart from "./../../assets/Heart.png";
import "./Post.css";
import {useEffect} from 'react';
import axios from 'axios';
import DefaultImg from "./../../assets/person/noAvatar.png"
import {format} from "timeago.js"
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../../Context/AuthContext';

const Post = ({
    _id,
    desc,
    img,
    createdAt,
    likes,
    userId
}) => {

    const {user: currentUser} = useContext(AuthContext);
    const [like,
        setLike] = useState(likes.length);
    const [isLiked,
        setIsLiked] = useState(false);
    const [user,
        setUser] = useState({});
    const {profilePicture, username} = user;

    useEffect(() => {
        setIsLiked(likes.includes(currentUser._id));
    }, [likes, currentUser._id]);

    const handleLike = async() => {
        setLike(isLiked
            ? like - 1
            : like + 1);
        setIsLiked(!isLiked);
        try {
            await axios.put(`http://localhost:8080/api/posts/${_id}/like`, {userId: currentUser._id});
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getUser = async() => {
            const res = await axios(`http://localhost:8080/api/users?userId=${userId}`);
            setUser(res.data);
        }
        getUser();
        console.log(img)
    }, [userId]);

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${username}`}>
                            <img className="postProfileImg" src={profilePicture || DefaultImg} alt="/"/>
                        </Link>
                        <Link to={`/profile/${username}`}>
                            <span className="postUsername">{username}</span>
                        </Link>
                        <span className="postDate">{format(createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <BiDotsVerticalRounded size={30}/>
                    </div>
                </div>
                <div className="postCenter">
                    {desc && <span className="postTitle">{desc}</span>}
                    <img src={`http://localhost:8080/images/${img}`} alt="" className="postImg"/>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img onClick={handleLike} className="likeIcon" src={Like} alt="like"/>
                        <img onClick={handleLike} className="likeIcon" src={Heart} alt="heart"/>
                        <Link to={`/post/${_id}/likes`}>
                            <span className="postLikeCounter">{like}
                                people like it</span>
                        </Link>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">9 comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post