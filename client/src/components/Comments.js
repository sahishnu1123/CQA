// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import {Card} from 'antd';

// function Comments() {
//     const [comments, setComments] = useState([]);
//     const [commentText, setCommentText] = useState("");
//     const location = useLocation();
//     const post_id =  location.state.post.post_id;
  
//   useEffect(() => {
//     const getcomments = async () => {
//       try {
//         const res = await axios.post('http://localhost:5000/comments', {postId : post_id});
//         setComments(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getcomments();
//   }, []);

//   const addComment = async () =>{

//     try{

//       await axios.post('http://localhost:5000/addcomment', {post_id: post_id, body: commentText, username :location.state.id})

//     }
//     catch(err){

//       console.log(err);
//     }
//   }



//   return (
//     <div>
//           <h1>{location.state.post.title}</h1>
//           <p>{location.state.post.body}</p>
//           {comments.map((comment, index) => (
//         <Card key={index} style={{ marginLeft: "35%", marginTop: "5px" }}>
//           <h4> Name: {comment.display_name} <br></br> (Id: {comment.user_id})</h4>
//           <p>Time: {comment.creation_date}</p>
//           <p>{comment.body}</p>
//         </Card>
//       ))}
//       <textarea value = {commentText} onChange={(e)=>{
//                 setCommentText(e.target.value);
//             }}>
//                 Add your Comment
//       </textarea>
    
//       <button onClick={addComment}>Add</button>
//     </div>
//   );
// }

// export default Comments;


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'antd';
import '../Styling/Comments.css';

function Comments() {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const location = useLocation();
  const post_id = location.state.post.post_id;

  useEffect(() => {
    const getcomments = async () => {
      try {
        const res = await axios.post('http://localhost:5000/comments', { postId: post_id });
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getcomments();
  }, []);

  const addComment = async () => {

    try {

      console.log(location.state)

      await axios.post('http://localhost:5000/addcomment', { post_id: post_id, body: commentText, username: location.state.id })

    }
    catch (err) {

      console.log(err);
    }
  }



  return (
    <div className="comments-container">
      <h1>{location.state.post.title}</h1>
      <p>{location.state.post.body}</p>
      {comments.map((comment, index) => (
        <Card key={index} className="comment-card">
          <h4> Name: {comment.display_name} <br></br> (Id: {comment.user_id})</h4>
          <p>Time: {comment.creation_date}</p>
          <p>{comment.body}</p>
        </Card>
      ))}
      <textarea value={commentText} onChange={(e) => {
        setCommentText(e.target.value);
      }}>
        Add your Comment
      </textarea>

      <button onClick={addComment}>Add</button>
    </div>
  );
}

export default Comments;



