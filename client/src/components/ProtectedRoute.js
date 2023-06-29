import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

function ProtectedRoute({auth, component:Component,...rest}) {
    const navigate = useNavigate();
    return (
        <Route 
        {...rest}
        render = {()=>auth? (
            <Component/>
        ):
        (
            <>
                {navigate("/login")}
            </>
        )
    }
        />
    )
}

export default ProtectedRoute;
