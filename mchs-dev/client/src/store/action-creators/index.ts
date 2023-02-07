import * as UsersActionCreators from './users';
import * as AuthActionCreators from './auth';

export default{
    ...UsersActionCreators,
    ...AuthActionCreators,
}