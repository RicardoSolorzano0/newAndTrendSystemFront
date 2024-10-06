import trendsApi from "../../api/trendsApi";

export const getTrends = async (page) => {
    try {
        const { data } = await trendsApi.get(`?page=${page}`);
        return data
    } catch (error) {
        const { response } = error;
        const { data } = response;
        const { message } = data;
        return { message }
    }
};