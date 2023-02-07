import axios from 'axios';
import { API_URL } from '../shared/constants';
import { SDeptJob } from '../shared/interfaces';

const JOBS_URL = API_URL + "job";
const getAlljobs = () =>{
    return axios.get<SDeptJob[]>(JOBS_URL + '/get/all');
}
const JobsService = {
    getAlljobs
};
export default JobsService;