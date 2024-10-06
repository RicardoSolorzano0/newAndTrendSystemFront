import axios from "axios";

const analysisApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/analyze"
});

export default analysisApi