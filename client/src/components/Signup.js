// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';


// function Signup() {
//     const navigate = useNavigate();
//     const [usernameReg, setUsernameReg] = useState("");
//     const [passwordReg, setPasswordReg] = useState("");
//     const [aboutmeReg, setAboutmeReg] = useState("");
//     const [locationReg, setLocationReg] = useState("");

//     const register = async (e) => {

//         e.preventDefault();
        
//         await axios.post('http://localhost:5000/signup',{

//             username: usernameReg,
//             password: passwordReg,
//             location: locationReg,
//             aboutme: aboutmeReg

//         }).then((res) => {

//             if(res.data.validity){

//                 navigate("/", {
                
//                     state: {
    
//                         id:usernameReg
//                     }
//                 })
//             }

//             else{ alert("Already existing user.")
        
//         };

//         }).catch((err) => {

//             console.log(err);

//         });
        
//     };

//     return (
//         <form className='form'>
//             <input type="text" placeholder='Username' onChange={(e)=>{
//                 setUsernameReg(e.target.value);
//             }}/>
//             <input type="password" placeholder='Password should be your username' onChange={(e)=>{
//                 setPasswordReg(e.target.value);
//             }}/>

//             <input type="text" placeholder='Location' onChange={(e)=>{
//                 setLocationReg(e.target.value);
//             }}/>
//             <textarea value = {aboutmeReg} onChange={(e)=>{
//                 setAboutmeReg(e.target.value);
//             }}>
//                 About me
//         </textarea>
           
//             <button type='submit' onClick={register}>Signup</button>
//         </form>
//     )
// }

// export default Signup;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styling/Signup.css'; // import external CSS file

function Signup() {
    const navigate = useNavigate();
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [aboutmeReg, setAboutmeReg] = useState("");
    const [locationReg, setLocationReg] = useState("");

    const register = async (e) => {

        e.preventDefault();
        
        await axios.post('http://localhost:5000/signup',{

            username: usernameReg,
            password: passwordReg,
            location: locationReg,
            aboutme: aboutmeReg

        }).then((res) => {

            if(res.data.validity){

                navigate("/", {
                
                    state: {
    
                        id:usernameReg
                    }
                })
            }

            else{ alert("Already existing user.")
        
        };

        }).catch((err) => {

            console.log(err);

        });
        
    };

    return (
        <form className='form'>
            <input type="text" placeholder='Username' className='form-input' onChange={(e)=>{
                setUsernameReg(e.target.value);
            }}/>
            <input type="password" placeholder='Password should be your username' className='form-input' onChange={(e)=>{
                setPasswordReg(e.target.value);
            }}/>

            <input type="text" placeholder='Location' className='form-input' onChange={(e)=>{
                setLocationReg(e.target.value);
            }}/>
            <textarea value = {aboutmeReg} className='form-textarea' onChange={(e)=>{
                setAboutmeReg(e.target.value);
            }}>
                About me
            </textarea>
           
            <button type='submit' className='form-button' onClick={register}>Signup</button>
        </form>
    )
}

export default Signup;
