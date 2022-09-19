import axios from "axios";



const axiosAPI = axios.create({

    timeout : 2000,
    baseURL : '/api',
})

export default axiosAPI;