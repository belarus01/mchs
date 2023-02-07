import {Dispatch} from "redux";
import axios from "axios";
import { UserAction, UsersActionTypes } from '../types/users';
import { authHeader } from "../../services/auth-header";
import { User } from "../../shared/interfaces";
import { GET_USERS_WITH_RELATIONS_URL, GET_USERS_WITH_RELATIONS_BY_DEPT_URL } from '../../shared/constants';

export const fetchUsers = ()=>{
    return async (dispatch: Dispatch<UserAction>) =>{
        try{
            dispatch({type:UsersActionTypes.FETCH_USERS});
            const response = await axios.get<User[]>(GET_USERS_WITH_RELATIONS_URL, {headers: authHeader()});
            dispatch({type: UsersActionTypes.FETCH_USERS_SUCCESS, payload:response.data});
        }
        catch(e){
            dispatch({
                type: UsersActionTypes.FETCH_USERS_ERROR,
                payload:'Произошла ошибка при загрузке пользователей'
            });
        }
    }
}

export const fetchUsersByDept = (idDept:number)=>{
    return async (dispatch: Dispatch<UserAction>) =>{
        try{
            dispatch({type:UsersActionTypes.FETCH_USERS});
            const response = await axios.get<User[]>(GET_USERS_WITH_RELATIONS_BY_DEPT_URL+`/${idDept}`, {headers: authHeader()});
            dispatch({type: UsersActionTypes.FETCH_USERS_SUCCESS, payload:response.data});
        }
        catch(e){
            dispatch({
                type: UsersActionTypes.FETCH_USERS_ERROR,
                payload:'Произошла ошибка при загрузке пользователей'
            });
        }
    }
}

export const setUsers = (users:User[]) : UserAction =>{
    return {type:UsersActionTypes.SET_USERS, payload: users};
}