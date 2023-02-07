import { User, LoginResponce } from '../../shared/interfaces';

export interface AuthState{
    user: User | null;
    token:string | null;
    loading: boolean;
    error: null | string;
};

export enum AuthActionTypes {
    LOGIN = 'LOGIN',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_ERROR = 'LOGIN_ERROR',
    SET_AUTH = 'SET_AUTH',
    SET_USER = 'SET_USER',
    SET_TOKEN = 'SET_TOKEN',
    GET_USER_BY_TOKEN = 'GET_USER_BY_TOKEN',
    GET_USER_BY_TOKEN_ERROR = 'GET_USER_BY_TOKEN_ERROR',
    GET_USER_BY_TOKEN_SUCCESS = 'GET_USER_BY_TOKEN_SUCCESS'
}

interface LoginAction{
    type: AuthActionTypes.LOGIN
}

interface LoginErrorAction{
    type: AuthActionTypes.LOGIN_ERROR;
    payload: string;
}

interface LoginSuccessAction{
    type: AuthActionTypes.LOGIN_SUCCESS;
    payload: LoginResponce;
}

interface SetUserAction{
    type: AuthActionTypes.SET_USER;
    payload: User;
}

interface SetTokenAction{
    type: AuthActionTypes.SET_TOKEN;
    payload: string;
}

interface SetAuthAction{
    type: AuthActionTypes.SET_AUTH;
    payload: LoginResponce;
}

interface GetUserByToken{
    type: AuthActionTypes.GET_USER_BY_TOKEN;
}

interface GetUserByTokenSuccess{
    type: AuthActionTypes.GET_USER_BY_TOKEN_SUCCESS;
    payload: User;
}
interface GetUserByTokenError{
    type: AuthActionTypes.GET_USER_BY_TOKEN_ERROR;
    payload: string;
}

export type AuthAction = LoginAction 
    | LoginErrorAction 
    | LoginSuccessAction 
    | SetUserAction 
    | SetTokenAction 
    | SetAuthAction
    | GetUserByToken
    | GetUserByTokenSuccess
    | GetUserByTokenError