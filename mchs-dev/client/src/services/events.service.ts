import axios from "axios";
import { API_URL } from "../shared/constants";
import { SEvents, SSubj } from "../shared/interfaces";
import { authHeader } from './auth-header';

const EVENTS_URL = API_URL + "events";

export const getAllEvents = () =>{
    return axios.get<SEvents[]>(EVENTS_URL + '/get/all', {headers:authHeader()});
}