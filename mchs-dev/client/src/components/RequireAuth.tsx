import useAuth from '../hooks/useAuth';

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { WithChildrenProps } from '../types/generalTypes';
import * as React from 'react';

type Props={
    allowedRoles: string[];
}

const RequireAuth: React.FC<Props> = ({allowedRoles})  =>{
    const {auth} = useContext(AuthContext);
    const location = useLocation();

    return ( 
        auth ?
            allowedRoles.includes(auth.role) 
                ? <Outlet/>
                : auth.token 
                    ? <Navigate to="/unauthorized" state={{from: location}} replace />
                    : <Navigate to="/login" state={{from: location}} replace />
            : <Navigate to="/login" state={{from: location}} replace />

    );
}

export default RequireAuth;