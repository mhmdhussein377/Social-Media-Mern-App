import React, {useState} from 'react'
import Post from '../Post/Post';
import Share from '../Share/Share';
import "./Feed.css";
import {useEffect} from 'react';
import axios from "axios";
import {useContext} from 'react';
import {AuthContext} from '../../Context/AuthContext';

const Feed = ({username}) => {

    const [posts,
        setPosts] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const getTimeline = async() => {
            const res = username
                ? await axios.get(`http://localhost:8080/api/posts/profile/${username}`)
                : await axios.get(`http://localhost:8080/api/posts/timeline/${user?._id}`);
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }));
        };
        getTimeline();
    }, [username, user?._id]);

    // const [isEditing, setIsEditing] = useState(false);
    // const [edits, setEdits] = useState({});

    // const handleEdit = (editings) => {
    //     setIsEditing(true);
    //     setEdits(editings);
    // }

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || user.username === username) && <Share/>}
                {posts.map((post, index) => (<Post {...post} key={index}/>))}
            </div>
        </div>
    );
}

export default Feed