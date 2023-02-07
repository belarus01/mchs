import { UsersState, UserAction, UsersActionTypes } from '../types/users';

const initialState: UsersState ={
    users:[],
    loading: false,
    error: null
};

export const usersReducer = (state = initialState, action: UserAction) :UsersState =>{
    switch(action.type){
        case UsersActionTypes.FETCH_USERS:
            return {loading:true, error:null, users:[]};
        case UsersActionTypes.FETCH_USERS_SUCCESS:
            return {loading:false, error:null, users: action.payload};
        case UsersActionTypes.FETCH_USERS_ERROR:
            return {loading:false, error:action.payload, users:[]};
        case UsersActionTypes.SET_USERS:
            return {...state, users: action.payload};
        default:
            return state;
    }
}