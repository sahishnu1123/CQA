import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styling/EditPost.css';


function EditPost() {

    const location = useLocation();

    const [tagData, setTagdata] = useState([]);
    useEffect(() => {
        const trial = async () => {

            try {
                const tagres = await axios.get('http://localhost:5000/tags');
                setTagdata(tagres.data);

            } catch (err) {
                console.log(err);
            }
        };

        trial();
    }, []);
    	

    const taglist = (props) => {

        const post_id = props.id;

        let tagarr = [];

        for (let i = 0; i < tagData.length; i++) {

            if (tagData[i].post_id === post_id) {

                tagarr.push(tagData[i].tag_name);
            }
        }

        //console.log(tagarr);

        return tagarr;

    }

    
    const tagarray = location.state.post.post_id;
    const arrayoftags = taglist({ id: tagarray });
    const navigate = useNavigate();
    const [title, setTitle] = useState(location.state.post.title);
    const [body, setBody] = useState(location.state.post.body);
    
    const [tags, setTags] = useState(arrayoftags || []);
    useEffect(() => {
        // console.log("hi")
        const Set = async () => {
            if(tags.length == 0)
            setTags(arrayoftags);
        }

        Set();
    }, [arrayoftags])
    // console.log(tags, arrayoftags);

    // console.log(tags);

    const Confirmedit = (props) => {

        props.preventDefault()

        //console.log(location)

        const edit = async () => {

            try {
                const editpostdata = await axios.post('http://localhost:5000/editpost', { post_id: tagarray, title: title, tags: tags, body: body });

                //console.log(editpostdata)

            } catch (err) {
                console.log(err);
            }
        };

        edit();

        navigate("/myprofile", {

            state: {

                id: location.state.user_id
            }
        })
    }

    // return (
    //     <form className='form'>
    //         <label>Title:</label>
    //         <input type="text" value={title} onChange={(e) => {
    //             setTitle(e.target.value);
    //         }} />
    //         <label>Tags:</label>
    //         <input type="text" value={tags ? tags.join(", ") : ""} onChange={(e) => {
    //             // console.log(tags)
    //             setTags(e.target.value.split(", "));
    //         }} />
    //         <label>Body:</label>
    //         <textarea value={body} onChange={(e) => {
    //             setBody(e.target.value);
    //         }}>
                
    //         </textarea>

    //         <button type='submit' onClick={Confirmedit}>Confirm Edit</button>
    //     </form>
    // )
    return (
        <form className='form'>
          <label className='title-label'>Title</label> {/* add class name */}
          <input type="text" value={title} onChange={(e) => {
            setTitle(e.target.value);
          }} />
          <label className='tags-label'>Tags</label> {/* add class name */}
          <input type="text" value={tags ? tags.join(", ") : ""} onChange={(e) => {
            setTags(e.target.value.split(", "));
          }} />
          <label className='body-label'>Body</label> {/* add class name */}
          <textarea value={body} onChange={(e) => {
            setBody(e.target.value);
          }}>
          </textarea>
      
          <button type='submit' onClick={Confirmedit}>Confirm Edit</button>
        </form>
      );
      
}

export default EditPost;