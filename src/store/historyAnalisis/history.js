import axios from "axios";

export const getHistory = async (id, page) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/history?id=${id}&page=${page}`);
        return data;
    } catch (error) {
        const { response } = error;
        const { data } = response;
        const { message } = data;
        return { err: message };
    }
}