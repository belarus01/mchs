import axios from "axios";
import { API_URL } from "../shared/constants";
import {authHeader} from './auth-header';
import { MemoryResponse, MemorySizeResponse } from '../shared/interfaces';
const CPU_URL = "http://192.168.150.29:3000/cpu";
const MEM_STATUS_URL = "http://192.168.150.29:3000/mem";
const MEM_SIZE_URL = "http://192.168.150.29:3000/size";
const getCpuUsage = () =>{
    return axios.get<string>(CPU_URL, {headers: authHeader()})
}
const getMemoryStatus = () =>{
    return axios.get<MemoryResponse[]>(MEM_STATUS_URL, {headers: authHeader()});
}

const getMemorySize = () =>{
    return axios.get<MemorySizeResponse[]>(MEM_SIZE_URL, {headers: authHeader()});
}

const StatsService = {
    getCpuUsage,
    getMemorySize,
    getMemoryStatus
}

export default StatsService;