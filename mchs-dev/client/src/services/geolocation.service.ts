import axios from 'axios';
import { API_URL } from "../shared/constants"
import { GeolocationData } from '../shared/interfaces';
import { authHeader } from './auth-header';

const sendLocation = (location: GeolocationData) =>{
    axios.post(API_URL + 'location/add', location, {headers: authHeader()});
}

const GeolocationService={
    sendLocation,
}

export default GeolocationService;