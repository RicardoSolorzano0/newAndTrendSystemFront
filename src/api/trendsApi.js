import axios from "axios";

const trendsApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/trends"
});

export default trendsApi