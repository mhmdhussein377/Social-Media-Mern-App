import React from 'react'
import {BiArrowBack} from "react-icons/bi";
import {BiSend} from "react-icons/bi"
import Like from "./../../assets/like.png";
import Heart from "./../../assets/heart.png";
import DefaultImg from "./../../assets/person/noAvatar.png"
import "./Comments.css"
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import axios from 'axios';
import {useState} from 'react';
import {useContext} from 'react';
import {AuthContext} from '../../Context/AuthContext';
import {format} from 'timeago.js';

const Comments = () => {

    const navigate = useNavigate();
    const {postIdComment} = useParams();
    const [comments,
        setComments] = useState([]);
    let [commentInput,
        setCommentInput] = useState("");
    const {user} = useContext(AuthContext);

    const handleInputChange = (e) => {
        setCommentInput(e.target.value);
    }

    const handleAddComment = async(e) => {
        e.preventDefault();

        if (commentInput !== "") {
            await axios.put(`http://localhost:8080/api/posts/post/${postIdComment}/comment`, {
                userId: user._id,
                text: commentInput,
                createdAt: new Date().setDate(new Date().getDate())
            });
            window
                .location
                .reload();
        }
    }

    useEffect(() => {
        const getComments = async() => {
            const res = await axios.get(`http://localhost:8080/api/posts/post/${postIdComment}/comments`);
            setComments(res.data.reverse());
        }
        getComments();
    }, [postIdComment]);

    console.log('comments');
    console.log(comments);

    return (
        <div className="comments">
            <div className="commentsTop">
                <BiArrowBack onClick={() => navigate(-1)} size={25} className="back"/>
                <div className="icons">
                    <Link to={`/post/${postIdComment}/likes`}>
                        <img src={Like} alt="like"/>
                    </Link>
                    <Link to={`/post/${postIdComment}/likes`}>
                        <img src={Heart} alt="heart"/>
                    </Link>
                </div>
            </div>
            <div className="commentsWrapper">
                <div className="allComments">
                    {comments.map((comment, index) => (
                        <div className="comment" key={index}>
                            <div className="commentUser">
                                <img
                                    src={comment.profilePicture
                                    ? `http://localhost:8080/images/${comment.profilePicture}`
                                    : DefaultImg}
                                    className="commentUserImg"
                                    alt="profilePicture"/>
                                <div className="commentUserInfo">
                                    <div className="commentUsername">{comment.username}</div>
                                    <div className="commentDate">
                                        {format(comment.createdAt)}
                                    </div>
                                </div>
                            </div>
                            <div className="commentText">{comment.text}</div>
                        </div>
                    ))}
                </div>
            </div>
            <form className="commentForm" onSubmit={handleAddComment}>
                <input
                    type="text"
                    value={commentInput}
                    onChange={handleInputChange}
                    className="commentInput"
                    placeholder="Write a comment"/>
                <button type="submit" className="commentButton">
                    <BiSend size={25} color="white"/>
                </button>
            </form>
        </div>
    );
}

export default Comments