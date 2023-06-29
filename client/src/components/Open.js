import React from 'react';
import { useNavigate } from 'react-router-dom';

function Open() {
    
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate("/login");
    }
    return (
        <div>
            <h1>Hello User</h1>
            <button onClick={handleOnClick}>Login</button>
        </div>
    )
}

export default Open;
