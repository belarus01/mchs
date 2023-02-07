import axios from 'axios';
import { SSoato } from '../shared/interfaces';
import { authHeader } from './auth-header';
import { API_URL } from '../shared/constants';
const SOATO_URL = API_URL + "soato/get/all";
export const getAllSoato = () =>{
    return axios.get<SSoato[]>(SOATO_URL, {headers:authHeader()});
}