import newsApi from "../../api/newsApi";

export const getNews = async (topic, page) => {
    try {
        const { data } = await newsApi.get(`?topic=${topic}&page=${page}`);
        return data
    } catch (error) {
        const { response } = error;
        const { data } = response;
        const { message } = data;
        return { err: message }
    }
};