import axios from "axios";

const historyApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/history"
});

export default historyApi