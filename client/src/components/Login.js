// import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import Axios from "axios";
// import AuthApi from './AuthApi';
// import { useNavigate } from 'react-router-dom';


// function Login() {
//     const [usernameLog, setUsernameLog] = useState("");
//     const [passwordLog, setPasswordLog] = useState("");
//     const Auth = React.useContext(AuthApi);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const cookieUser = Cookies.get("user");
//         if(cookieUser != null) {
//             navigate("/home", {
                
//                 state: {

//                     id: cookieUser
//                 }
//             })
//         }
//     }, [])

//     const login = (e) => {
//         e.preventDefault();

//         Axios.post('http://localhost:5000/login', {
//             username: usernameLog,
//             password: passwordLog
//         }).then((response)=>{

//             if(response.data.validity){

//                 navigate("/home", {
                
//                     state: {
    
//                         id:usernameLog
//                     }
//                 })
//             }

//             else alert("No user");
//         })
//         Cookies.set("user",usernameLog)
//     };


//     const signup = ()=>{

//         navigate("/signup");
//     }

//     return (
//         <div>
//         <form className='form'>
//             <input type="text" placeholder='Username' onChange={(e)=>{
//                 setUsernameLog(e.target.value);
//             }}/>
//             <input type="password" placeholder='Password' onChange={(e)=>{
//                 setPasswordLog(e.target.value);
//             }}/>
//             <button type='submit' onClick={login}>Login</button>
            
//         </form>
//         <button type='submit' onClick={signup}>Signup?</button>
//         </div>
//     )
// }

// export default Login;
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Axios from "axios";
import AuthApi from './AuthApi';
import { useNavigate } from 'react-router-dom';
import '../Styling/Login.css';

function Login() {
    const [usernameLog, setUsernameLog] = useState("");
    const [passwordLog, setPasswordLog] = useState("");
    const Auth = React.useContext(AuthApi);
    const navigate = useNavigate();
    useEffect(() => {
                const cookieUser = Cookies.get("user");
                if(cookieUser != null) {
                    navigate("/home", {
                        
                        state: {
        
                            id: cookieUser
                        }
                    })
                }
            }, [])

    const login = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:5000/login', {
            username: usernameLog,
            password: passwordLog
        }).then((response)=>{
            if(response.data.validity){
                navigate("/home", {
                    state: {
                        id:usernameLog
                    }
                })
            } else {
                alert("No user");
            }
        })
        Cookies.set("user",usernameLog)
    };

    const handleOnClick = () => {
        Auth.setAuth(true);
        Cookies.set("user", "loginTrue");
    }

    const signup = ()=>{
        navigate("/signup");
    }

    return (
        <div className='login-container'>
            <h1>'CQA'</h1>
            <form className='login-form'>
                <input type="text" placeholder='Username' className='login-input' onChange={(e)=>{
                    setUsernameLog(e.target.value);
                }}/>
                <input type="password" placeholder='Password' className='login-input' onChange={(e)=>{
                    setPasswordLog(e.target.value);
                }}/>
                <button type='submit' className='login-button' onClick={login}>Login</button>
            </form>
            <button type='submit' className='signup-button' onClick={signup}>Signup?</button>
        </div>
    )
}

export default Login;