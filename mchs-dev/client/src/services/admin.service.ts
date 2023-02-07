import axios from "axios";
import { API_URL } from "../shared/constants";
import {authHeader} from './auth-header';

const STATS_URL = "localhost:4000/statistics/all";

export const getStats = () =>{
    return axios.get(STATS_URL, {headers: authHeader()});
}