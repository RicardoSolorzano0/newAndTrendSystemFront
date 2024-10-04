import axios from "axios";

export const getNews = async (topic, page) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/news?topic=${topic}&page=${page}`);
        return data
    } catch (error) {
        const { response } = error;
        const { data } = response;
        const { message } = data;
        return { err: message }
    }
};