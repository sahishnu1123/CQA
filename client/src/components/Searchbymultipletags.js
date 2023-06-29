import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'antd';

function Searchbymultipletags() {
  const [posts, setPosts] = useState([]);
  const [voteData, setVotedata] = useState([]);
  const [tagData, setTagdata] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const trial = async () => {
      try {
        console.log(location.state.tagarray);
        const postres = await axios.post('http://localhost:5000/multipletagposts', {tagarray : location.state.tagarray});
        const voteres = await axios.get('http://localhost:5000/votes');
        const tagres = await axios.get('http://localhost:5000/tags');
        setPosts(postres.data);
        setVotedata(voteres.data);
        setTagdata(tagres.data);

      } catch (err) {
        console.log(err);
      }
    };
    trial();
  }, []);

  const Comments = (props) => {

    navigate("/comments", {

      state: {

        post: props
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

  const taglist = (props) =>{

    const post_id = props.id;

    let tagarr = [];

    for(let i = 0; i < tagData.length; i++){

      if(tagData[i].post_id === post_id){

        tagarr.push(tagData[i].tag_name);
      }
    }

    return tagarr.join(", ");

  }

  const myprofile = ()=>{

    navigate("/home", {
                
      state: {

          id:location.state.id
      }
  })


  }

  const upvotehandle = async (props) => {

    try {
      // console.log(location.state.username);
      await axios.post('http://localhost:5000/upvotehandle', { post: props, username: location.state.username });

      //window.location.reload();

    } catch (err) {

      console.log(err)
    }
  }

  const downvotehandle = async (props) => {

    try {
      await axios.post('http://localhost:5000/downvotehandle', { post: props, username: location.state.username });

      //window.location.reload();

    } catch (err) {

      console.log(err)
    }
  }

  return (
    <div>

      {posts.map((post, index) => (
        <Card key={index} style={{ marginLeft: "35%", marginTop: "5px" }}>

          <h1>{post.title}</h1>
          <h4>by {post.display_name}</h4>
          <p>{post.body}</p>
          <h6>Tags-{taglist({ id: post.post_id })}</h6>
          <button onClick={() => upvotehandle(post)}>Upvotes-{votecount({ id: post.post_id, type: 1 })}</button>
          <button onClick={() => downvotehandle(post)}>Downvotes-{votecount({ id: post.post_id, type: 0 })}</button>
          <p>Creation time: {post.creation_date}</p>
          <p>Last edited on: {post.last_edit_date}</p>
          <button onClick={()=>Comments(post)} >Comments</button>
        </Card>
      ))}
    </div>
  );
}

export default Searchbymultipletags;
