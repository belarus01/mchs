import axios from "axios";
import { API_URL } from "../shared/constants";
import { SSubj } from "../shared/interfaces";
import { authHeader } from './auth-header';

const SUBJECTS_URL = API_URL + "subject";

export const getAllSubjects = () =>{
    return axios.get<SSubj[]>(SUBJECTS_URL + '/get/all', {headers:authHeader()});
}