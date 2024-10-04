import axios from "axios";

export const getTrends = async (page) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/trends?page=${page}`);
        return data
    } catch (error) {
        const { response } = error;
        const { data } = response;
        const { message } = data;
        return { err: message }
    }
};