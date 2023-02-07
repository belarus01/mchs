import axios from 'axios';
import { API_URL } from '../shared/constants';
import {authHeader} from './auth-header';
import { DeleteUserDTO, UserDTO, CreateUserDTO, User } from '../shared/interfaces';

const USERS_URL = API_URL + "users";

const getAllUsers = () =>{
    return axios.get<User[]>(USERS_URL + '/get/all/relations', {headers: authHeader()});
}

const getAllUsersByDepartment = (idDept: number) =>{
    return axios.get<User[]>(USERS_URL + '/get/all/department/relations'+`/${idDept}`, {headers: authHeader()});
}

const createUser = (user: CreateUserDTO) =>{
    return axios.post(USERS_URL + '/create', user, {headers: authHeader()})
}

const deleteUserBy  = (id: number) =>{
    return axios.delete(USERS_URL + `/${id}`, {headers: authHeader()});
}

const deleteUser = (dto:DeleteUserDTO) =>{
    return axios.put(USERS_URL + '/delete', {data: dto}, {headers: authHeader()});
}

const updateUser = ( dto: CreateUserDTO) =>{
    return axios.put(USERS_URL + '/update', dto, {headers:authHeader()});
}

// export const getUserByLogin = (login: string) =>{
//     return axios.get<IUser>(USERS_URL + `/${login}`, {headers: authHeader()});
// }

const UserService = {
    getAllUsers,
    getAllUsersByDepartment,
    deleteUser,
    createUser,
    updateUser

}

export default UserService;