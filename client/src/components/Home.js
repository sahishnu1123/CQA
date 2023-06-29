import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'antd';
import Searchbyuserid from './Searchbyuserid';

function Home() {
  const [posts, setPosts] = useState([]);
  const [voteData, setVotedata] = useState([]);
  const [tagData, setTagdata] = useState([]);
  const [userSearch, setUsersearch] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [postMatch, setPostMatch] = useState([]);

  const [user_iddata, setUser_iddata] = useState([]);

  useEffect(() => {
    const trial = async () => {
      try {
        const res = await axios.get('http://localhost:5000/home');
        const voteres = await axios.get('http://localhost:5000/votes');
        const tagres = await axios.get('http://localhost:5000/tags');
        setPosts(res.data);
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

        id: location.state.id,

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

  const myprofile = () => {

    navigate("/myprofile", {

      state: {

        id: location.state.id
      }
    })


  }

  const searchbyuserid = () => {

    navigate("/searchbyuserid", {

      state: {

        id: userSearch,
        username: location.state.id
      }
    })

  }

  const autobyuserid = async (text) => {
    console.log(text);
    if (!text) {
      setPostMatch([]);
    } else {

      const res = await axios.post('http://localhost:5000/autobyuserid',{text:text})
      setUser_iddata(res.data);
      console.log(user_iddata);
    }
  }

  const searchbytag = () => {

    navigate("/searchbytag", {

      state: {

        id: userSearch,
        username: location.state.id
      }
    })


  }

  const autobytag = (text) => {

    if (!text) {
      setPostMatch([]);
    } else {
      let matches = user_iddata.filter((post) => {
        const regex = new RegExp('${text}', 'gi');
        return post.user.match(regex) || post.tags.match(regex);
      });
      setPostMatch(matches);
    }


  }

  const searchbymultipletag = () => {

    // setValues(userSearch.split(", "))

    navigate("/searchbymultipletags", {

      state: {

        tagarray: userSearch.split(", "),
        username: location.state.id

      }
    })


  }

  const autobymultipletag = (text) => {

    if (!text) {
      setPostMatch([]);
    } else {
      let matches = posts.filter((post) => {
        const regex = new RegExp('${text}', 'gi');
        return post.user.match(regex) || post.tags.match(regex);
      });
      setPostMatch(matches);
    }


  }

  const search = () => {
    if (selectedOption === "UserID") {

      searchbyuserid();

    } else if (selectedOption === "Tag") {

      searchbytag();

    } else if (selectedOption === "Multiple Tags") {

      searchbymultipletag();

    } else {

    }
  }

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const autocomplete = (e) => {
    e.preventDefault();
    if (selectedOption === "UserID") {

      autobyuserid(e.target.value);

    } else if (selectedOption === "Tag") {

      autobytag(e.target.value);

    } else if (selectedOption === "Multiple Tags") {

      autobymultipletag(e.target.value);

    } else {

    }


  }

  const upvotehandle = async (props) => {

    try {
      await axios.post('http://localhost:5000/upvotehandle', { post: props, username: location.state.id });

      window.location.reload();

    } catch (err) {

      console.log(err)
    }
  }

  const downvotehandle = async (props) => {

    try {
      await axios.post('http://localhost:5000/downvotehandle', { post: props, username: location.state.id });

      window.location.reload();

    } catch (err) {

      console.log(err)
    }
  }

  return (
    <div>
      <h1>Hello {location.state.id}</h1>
      <button onClick={myprofile}>Profile</button>
      <div>
        <input
          type="radio"
          value="UserID"
          checked={selectedOption === "UserID"}
          onChange={handleOptionChange}
        />
        <label>UserID</label>
        <input
          type="radio"
          value="Tag"
          checked={selectedOption === "Tag"}
          onChange={handleOptionChange}
        />
        <label>Tag</label>
        <input
          type="radio"
          value="Multiple Tags"
          checked={selectedOption === "Multiple Tags"}
          onChange={handleOptionChange}
        />
        <label>Multiple Tags</label>
      </div>
      <input type="text" placeholder='search' onChange={(e) => {
        setUsersearch(e.target.value);
        autocomplete(e)
      }} />
      <button onClick={search}>Go</button>
    

    

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
          <button onClick={() => Comments(post)} >Comments</button>
        </Card>
      ))}
      {user_iddata.map((user, index) => {
        <div key={index}>
            <p>{user.display_name}</p>
        </div>
      })}
    </div>
  );
}

export default Home;
