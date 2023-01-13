import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import "./Home.css";

const Home = () => {
    return (
        <div>
            <Topbar/>
            <div className="homeContainer">
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </div>
        </div>
    );
}

export default Home