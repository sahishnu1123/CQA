import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthApi from "./AuthApi";
import Home from "./Home.js";

function ProtectedLogin(props) {
  const navigate = useNavigate();
  const Auth = React.useContext(AuthApi);
  return (
    <Routes>
      <Route
        // path={props.path}
        render={() => (Auth.auth ? <Home /> : <>{navigate("/login")}</>)}
      />
    </Routes>
  );
}

export default ProtectedLogin;
