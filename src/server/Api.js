import axios from 'axios';
import { toast } from 'react-toastify';

const commonGetApi = async (url) => {
    try {
        const res = await axios.get(url);
        return res;
    } catch (error) {
        toast.error(error?.response?.data)
        console.log(error)
        return error;
    }
};

export default commonGetApi;
