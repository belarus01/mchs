import { usersReducer } from './usersReducer';
import {combineReducers} from "redux";
import { authReducer } from './authReducer';
export const rootReducer = combineReducers({
    users: usersReducer,
    auth: authReducer
})

export type RootState = ReturnType<typeof rootReducer>