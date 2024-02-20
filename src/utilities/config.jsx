
import axios from 'axios';

const config = {
    "axiosInstance": axios.create({
        baseURL : 'http://localhost:5100/',
        timeout: 5000,
    })
}

export default config