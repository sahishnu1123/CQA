import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'antd';
import Cookies from 'js-cookie';

function Myprofile() {
    const [posts, setPosts] = useState([]);
    const [voteData, setVotedata] = useState([]);
    const [tagData, setTagdata] = useState([]);
    const [personalData, setPersonaldata] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const trial = async () => {

            try {
                //console.log(location.state.id);
                const personalres = await axios.post('http://localhost:5000/bio', { user_id: location.state.id });
                setPersonaldata(personalres.data)
                const postres = await axios.post('http://localhost:5000/myposts', { user_id: location.state.id });
                const voteres = await axios.get('http://localhost:5000/votes');
                const tagres = await axios.get('http://localhost:5000/tags');
                setPosts(postres.data)
                setVotedata(voteres.data);
                setTagdata(tagres.data);
                //console.log(personalData);

            } catch (err) {
                console.log(err);
            }
        };

        trial();
    }, []);

    const Comments = (props) => {

        console.log(location.state.id)

        navigate("/comments", {

            state: {

                id : location.state.id,

                post:props
            }
        })
    };

    const votecount = (props) => {

        const id = props.id;
        const type = props.type;

        let ret = 0;

        for (let i = 0; i < voteData.length; i++) {

            if (id == voteData[i].post_id) {

                if (type == voteData[i].vote_type_id) {

                    ret = voteData[i].count;

                    return ret;
                }
            }
        }

        return ret;

    }

    const taglist = (props) => {

        const post_id = props.id;

        let tagarr = [];

        for (let i = 0; i < tagData.length; i++) {

            if (tagData[i].post_id === post_id) {

                tagarr.push(tagData[i].tag_name);
            }
        }

        return tagarr.join(", ");

    }

    const Deletepost = (props) =>{

        const del = async () => {

            try {
                const personalres = await axios.post('http://localhost:5000/deletepost', { post_id: props});

            } catch (err) {
                console.log(err);
            }
        };

        del();
        
        window.location.reload();
    }

    const Editpost = (props) => {

        navigate("/editpost", {

            state: {

                user_id:location.state.id,

                post: props
            }
        })
    }

    const Addpost = (props) => {

        navigate("/Addpost", {

            state: {

                user_id:location.state.id,
            }
        })
    }
    const Logout = () => {
        Cookies.remove("user");
        navigate("/")
    }

    return (
        <div>
            <h1>Hello {location.state.id}</h1>
            {personalData.length > 0 && (
            <div>
            <h4>ID: {personalData[0].account_id}</h4>
            <h4>Location: {personalData[0].location}</h4>
            <h4>About: {personalData[0].about_me}</h4>
            </div>
            )}
            {posts.map((post, index) => (
                <Card key={index} style={{ marginLeft: "35%", marginTop: "5px" }}>

                    <h1>{post.title}</h1>
                    <h4>by {post.display_name}</h4>
                    <p>{post.body}</p>
                    <h6>Tags-{taglist({ id: post.post_id })}</h6>
                    <h6>Upvotes-{votecount({ id: post.post_id, type: 1 })}</h6>
                    <h6>Downvotes-{votecount({ id: post.post_id, type: 0 })}</h6>
                    <p>Creation time: {post.creation_date}</p>
                    <button onClick={() => Comments(post)} >Comments</button>
                    <button onClick={()=> Editpost(post)}>Edit</button>
                    <button onClick = {()=>Deletepost(post.post_id)}>Delete</button>
                </Card>
            ))}

            <button onClick={Addpost} >Add Post</button>
            <br />
            <button onClick={Logout} >Logout</button>            
        </div>
    );
}

export default Myprofile;

