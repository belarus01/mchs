export const API_URL = "http://192.168.150.15:4000/";
export const USERS_URL = API_URL + "users";
export const GET_USERS_WITH_RELATIONS_URL = USERS_URL + '/get/all/relations';
export const GET_USERS_WITH_RELATIONS_BY_DEPT_URL = USERS_URL + '/get/all/department/relations';
export const LOGIN_URL = API_URL + "auth/login";
export const GET_USER_BY_TOKEN_URL = API_URL + "auth/user";

export const ROLES = {
    'User': 4,
    'Сhief': 3,
    'Admin': 2,
    'Syperadmin':1
  }
  
export const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
    bgcolor: '#ffffff',
    overflow: 'auto',
    boxShadow: 24,
    padding: '1rem 2rem',
    border: 0,
    borderRadius: '6px',
};