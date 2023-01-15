import React, {useRef, useState} from 'react'
import {MdPhotoLibrary, MdTagFaces} from "react-icons/md";
import {AiFillTag} from "react-icons/ai";
import {IoLocationSharp} from "react-icons/io5";
import "./Share.css";
import {useContext} from 'react';
import {AuthContext} from '../../Context/AuthContext';
import DefaultImg from "./../../assets/person/noAvatar.png";
import axios from "axios";
import {MdOutlineCancel} from "react-icons/md";

const Share = ({isEditing, edits}) => {

    const {user} = useContext(AuthContext);
    const desc = useRef();
    const [file,
        setFile] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();

            const newPost = {
                userId: user._id,
                desc: desc.current.value
            }

            let data;

            if (file) {
                data = new FormData();
                const filename = Date.now() + file.name;
                data.append("name", filename);
                data.append("file", file);
                newPost.img = filename;

                try {
                    await axios.post("http://localhost:8080/api/upload", data);
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            }

            try {
                const res = await axios.post("http://localhost:8080/api/posts", newPost);
                window
                    .location
                    .reload();
            } catch (error) {
                console.log(error);
            }
        // if(file) {     const data = new FormData();     const fileName = Date.now() +
        // file.name;     data.append("file", file);     data.append("name", fileName);
        //  newPost.img = fileName;     console.log(data)     try {         await
        // axios.post("http://localhost:8080/api/upload", data); console.log(data); }
        // catch (error) {         console.log(error);     } } try {     await
        // axios.post("http://localhost:8080/api/posts", newPost); desc.current.value =
        // ""; } catch (error) {     console.log(error); }

    }

    console.log("ppp")
    console.log(user)
    console.log("ppp")

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        className="shareProfileImg"
                        src={user?.profilePicture ? `http://localhost:8080/images/${user?.profilePicture}` : DefaultImg}
                        alt="/"/>
                    <input
                        ref={desc}
                        type="text"
                        className="shareInput"
                        value={edits?.desc}
                        placeholder={`What's in your mind ${user.username}?`}/>
                </div>
                <hr className="shareHr"/> {(file) && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} className="shareImg" alt=""/>
                        <MdOutlineCancel
                            size={30}
                            className='shareCancelImg'
                            onClick={() => setFile(null)}/>
                    </div>
                )}
                <form className="shareBottom" onSubmit={handleSubmit}>
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <MdPhotoLibrary className="shareIcon" size={29} color="tomato"/>
                            <span className="shareOptionText">Photo or Video</span>
                            <input
                                type="file"
                                id='file'
                                onChange={(e) => setFile(e.target.files[0])}
                                accept='.png, .jpeg, .jpg'
                                style={{
                                display: "none"
                            }}/>
                        </label>
                        <div className="shareOption">
                            <AiFillTag className="shareIcon" size={26} color="blue"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <IoLocationSharp className="shareIcon" size={27} color="green"/>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <MdTagFaces className="shareIcon" size={28} color="goldenrod"/>
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className='shareButton' type='submit'>Share</button>
                </form>
            </div>
        </div>
    );
}

export default Share