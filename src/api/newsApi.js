import axios from "axios";

const newsApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/news"
});

export default newsApi