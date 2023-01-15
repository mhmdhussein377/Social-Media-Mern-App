import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import "./Home.css";
import Likes from '../../components/Likes/Likes';
import {useParams} from 'react-router-dom';
import Comments from '../../components/comments/Comments';

const Home = () => {

    const {postId, postIdComment} = useParams();

    return (
        <div>
            <Topbar/>
            <div className="homeContainer">
                <Sidebar/>
                {postId && <Likes />}
                {postIdComment && <Comments />}
                {(!postId && !postIdComment) && <Feed />}
                <Rightbar/>
            </div>
        </div>
    );
}

export default Home