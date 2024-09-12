import axios from 'axios';
import {API_URL} from './contans';


const axiosApi = axios.create({
  baseURL: API_URL,
});

export default axiosApi;