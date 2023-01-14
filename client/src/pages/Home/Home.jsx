import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import "./Home.css";
import Likes from '../../components/Likes/Likes';
import { useParams } from 'react-router-dom';

const Home = () => {

    const {postId} = useParams();

    return (
        <div>
            <Topbar/>
            <div className="homeContainer">
                <Sidebar/>
                {postId ? <Likes /> : <Feed />}
                <Rightbar/>
            </div>
        </div>
    );
}

export default Home