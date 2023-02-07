import axios from "axios";
import { API_URL } from "../shared/constants";
import { authHeader } from './auth-header';

const DEPARTMENT_URL = API_URL + "department";

const getAllDepartments = ()=>{
    return axios.get(DEPARTMENT_URL + '/get', {headers: authHeader()});
}

const DepartmentsService = {
    getAllDepartments
}

export default DepartmentsService;