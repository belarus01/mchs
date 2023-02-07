import { AuthAction, AuthActionTypes } from '../types/auth';
import {Dispatch} from "redux";
import axios from 'axios';
import { LOGIN_URL, GET_USER_BY_TOKEN_URL } from '../../shared/constants';
import { LoginResponce, LoginRequest, User } from '../../shared/interfaces';
import { authHeader } from "../../services/auth-header";

export const authenticate = (req:LoginRequest) =>{
    return async (dispatch: Dispatch<AuthAction>) =>{
        try{
            dispatch({type: AuthActionTypes.LOGIN});
            const response = await axios.post<LoginResponce>(LOGIN_URL, req, {headers: authHeader()});
            dispatch({type:AuthActionTypes.LOGIN_SUCCESS, payload:response.data});
            localStorage.setItem('token', response.data.token);
            
        }
        catch(e){
            dispatch({type:AuthActionTypes.LOGIN_ERROR, payload:'Неверный логин или пароль'});
        }
    }
}

export const getUserByToken = (token: string) =>{
    return async (dispatch:Dispatch<AuthAction>) =>{
        try{
            dispatch({type: AuthActionTypes.GET_USER_BY_TOKEN});
            const response = await axios.post<User>(GET_USER_BY_TOKEN_URL, {token}, {headers: authHeader()});
            dispatch({type:AuthActionTypes.GET_USER_BY_TOKEN_SUCCESS, payload:response.data});
        }
        catch(e){
            dispatch({type:AuthActionTypes.GET_USER_BY_TOKEN_ERROR, payload:'Произошла ошибка'});
        }
    }
}