import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


function AddPost() {

    const location = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState();
    const [body, setBody] = useState();    
    const [tags, setTags] = useState();


    const Createpost = () => {

        const add = async () => {

            try {
                await axios.post('http://localhost:5000/addpost', { name: location.state.user_id, title: title, tags: tags, body: body });


            } catch (err) {
                console.log(err);
            }
        };

        add();

        navigate("/myprofile", {

            state: {

                id: location.state.user_id
            }
        })
    }

    return (
        <form className='form'>
            <input type="text" placeholder = 'Enter title' onChange={(e) => {
                setTitle(e.target.value);
            }} />
            <input type="text" placeholder = 'Enter tags' onChange={(e) => {
                // console.log(tags)
                setTags(e.target.value);
            }} />
            <textarea onChange={(e) => {
                setBody(e.target.value);
            }}>
                Enter body here
            </textarea>

            <button type='submit' onClick={Createpost}>Confirm Edit</button>
        </form>
    )
}

export default AddPost;