import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { WithChildrenProps } from '../types/generalTypes';
import * as React from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { getUserByToken } from '../store/action-creators/auth';

type Props={
    allowedRoles: number[];
}

const RequireRoles: React.FC<Props> = ({allowedRoles})  =>{
    const {user, token} = useTypedSelector(state => state.auth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        if(token){
            getUserByToken(token);
        }
    }, [token]);

    return ( 
            user?
            allowedRoles.includes(user.userRole) 
                ? <Outlet/>
                : <Navigate to='/restricted' state={{from: location}} replace />
            : <Navigate to="/signin" state={{from: location}} replace />
    );
}

export default RequireRoles;