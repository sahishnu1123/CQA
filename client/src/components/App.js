import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Home from "./Home.js";
import Open from "./Open.js";
import ProtectedRoute from "./ProtectedRoute.js";
import ProtectedLogin from "./ProtectedLogin.js";
import AuthApi from "./AuthApi.js";
import Cookies from "js-cookie";
import Comments from "./Comments.js";
import Myprofile from "./Myprofile.js";
import Searchbyuserid from "./Searchbyuserid.js"
import Searchbytag from "./Searchbytag.js"
import Searchbymultipletags from "./Searchbymultipletags.js"
import EditPost from "./EditPost.js"
import Addpost from "./Addpost.js"


function App() {
    const [auth, setAuth] = React.useState(true);
    const readCookie = () => {
        const user = Cookies.get("user");
        if (user) {
            setAuth(true);
        }
    };
    React.useEffect(() => {
        readCookie();
    }, []);

    return (
        <AuthApi.Provider value={{ auth, setAuth }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path ="/home" element = {<Home />}/>
                    <Route path ="/comments" element = {<Comments />}/>
                    <Route path ="/myprofile" element = {<Myprofile />}/>
                    <Route path ="/searchbyuserid" element = {<Searchbyuserid />}/>         
                    <Route path ="/searchbytag" element = {<Searchbytag />}/>
                    <Route path ="/searchbymultipletags" element = {<Searchbymultipletags />}/>
                    <Route path ="/editpost" element = {<EditPost />}/>
                    <Route path ="/addpost" element = {<Addpost />}/>
                </Routes>
            </BrowserRouter>
        </AuthApi.Provider>
    );
}

export default App;
