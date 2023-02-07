import { User } from "../../shared/interfaces";

export interface UsersState{
    users: User[];
    loading: boolean;
    error: null | string;
}

export enum UsersActionTypes {
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
    SET_USERS = 'SET_USERS'
}

interface FetchUsersAction {
    type: UsersActionTypes.FETCH_USERS;
}

interface FetchUsersSuccessAction {
    type: UsersActionTypes.FETCH_USERS_SUCCESS;
    payload: User[]
}

interface FetchUsersErrorAction {
    type: UsersActionTypes.FETCH_USERS_ERROR;
    payload: string;
}

interface SetUsersAction {
    type: UsersActionTypes.SET_USERS,
    payload: User[];
}

export type UserAction = FetchUsersAction | FetchUsersErrorAction | FetchUsersSuccessAction | SetUsersAction