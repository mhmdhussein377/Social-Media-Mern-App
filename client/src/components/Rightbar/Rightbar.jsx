import React from 'react';
import BirthDayImage from "./../../assets/gift.png";
import AdImage from "./../../assets/ad.png";
import Person1 from "./../../assets/person/1.jpeg";
import Person2 from "./../../assets/person/2.jpeg";
import Person3 from "./../../assets/person/3.jpeg";
import Person4 from "./../../assets/person/4.jpeg";
import Person5 from "./../../assets/person/5.jpeg";
import DefaultImg from "./../../assets/person/noAvatar.png"
import {Users} from '../../DummyData';
import "./Rightbar.css";
import Online from '../Online/Online';
import {useEffect} from 'react';
import axios from 'axios';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../../Context/AuthContext';
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";

const Rightbar = ({profile, user}) => {

    const {user: currentUser} = useContext(AuthContext);

    const HomeRightBar = () => {
        return (
            <div>
                <div className="birthdayContainer">
                    <img src={BirthDayImage} className="birthdayImg" alt="gift"/>
                    <span className="birthdayText">
                        <b>Pola Foster</b>
                        and
                        <b>3 other friends</b>
                        have a birthday today.
                    </span>
                </div>{" "}
                <img src={AdImage} className="rightbarAd" alt="ad"/>{" "}
                <h4 className="rightbarTitle">Online Friends</h4>{" "}
                <ul className="rightbarFriendsList">
                    {" "}
                    {Users.map((user, index) => (<Online {...user} key={index}/>))}{" "}
                </ul>
            </div>
        );
    }

    const ProfileRightBar = () => {

        const [friends,
            setFriends] = useState([]);
        const [followed,
            setFollowed] = useState(false);

        useEffect(() => {
            setFollowed(currentUser.following.includes(user
                ?._id));
        }, [currentUser, user._id]);

        useEffect(() => {
            const getFriends = async() => {
                try {
                    const friendsList = await axios.get(`http://localhost:8080/api/users/friends/${user._id}`);
                    setFriends(friendsList.data);
                } catch (error) {
                    console.log(error);
                }
            };
            getFriends();
            console.log("friends list")
        }, [user]);

        let handleFollow = async() => {
            try {
                if (followed) {
                    await axios.put(`http://localhost:8080/api/users/${user._id}/unfollow`, {userId: currentUser._id});
                } else {
                    await axios.put(`http://localhost:8080/api/users/${user._id}/follow`, {userId: currentUser._id});
                }
            } catch (error) {
                console.log(error);
            }
            setFollowed(!followed);
        }

        return (
            <div>
                {currentUser.username !== user.username && (
                    <button onClick={handleFollow} className='rightbarFollowButton'>{followed
                            ? "Unfollow"
                            : "Follow"} {followed
                            ? <AiOutlineMinus size={20}/>
                            : <AiOutlinePlus size={20}/>}</button>
                )}
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">
                            {user.relationship === 1
                                ? "Single"
                                : user.relationship === 2
                                    ? "Married"
                                    : "-"}
                        </span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend, index) => (
                        <Link
                            to={`/profile/${friend.username}`}
                            key={index}
                            style={{
                            textAlign: "center"
                        }}>
                            <div className="rightbarFollowing">
                                <img
                                    src={friend.profilePicture
                                    ? `http://localhost:8080/images/${friend.profilePicture}`
                                    : DefaultImg}
                                    className="rightbarFollowingImg"
                                    alt="person"/>
                                <span className="rightbarFollowingName">
                                    {friend.username}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user
                    ? <ProfileRightBar/>
                    : <HomeRightBar/>}
            </div>
        </div>
    );
}

export default Rightbar