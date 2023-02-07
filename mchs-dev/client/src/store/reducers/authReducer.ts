import { AuthState, AuthAction, AuthActionTypes } from '../types/auth';

const token = localStorage.getItem('token') 
    ? localStorage.getItem('token') 
    : null;

const initialState : AuthState ={
    user:null,
    loading:false,
    error:null,
    token:token
};

export const authReducer = (state =  initialState, action:AuthAction): AuthState =>{
    switch(action.type){
        case AuthActionTypes.LOGIN:
            return {loading:true, error:null, user:null, token:''};
        case AuthActionTypes.LOGIN_SUCCESS:
            return {loading:false, error:null, user:action.payload.user, token:action.payload.token};
        case AuthActionTypes.LOGIN_ERROR:
            return {loading:false, error:action.payload, user:null, token:''};
        case AuthActionTypes.SET_AUTH:
            return {...state, user: action.payload.user, token:action.payload.token};
        case AuthActionTypes.SET_TOKEN:
            return {...state, token: action.payload};
        case AuthActionTypes.GET_USER_BY_TOKEN:
            return {...state, loading: true};
        case AuthActionTypes.GET_USER_BY_TOKEN_SUCCESS:
            return {...state, loading:false, user: action.payload};
        case AuthActionTypes.GET_USER_BY_TOKEN_ERROR:
            return {...state, loading:false, error: action.payload};
        case AuthActionTypes.SET_USER:
            return {...state, user:action.payload};
        default:
            return state;
    }
}