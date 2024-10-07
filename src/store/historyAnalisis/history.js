import historyApi from "../../api/historyApi";

export const getHistory = async (id) => {
    try {
        const { data } = await historyApi.get(`?id=${id}`);
        return data;
    } catch (error) {
        const { response } = error;
        const { data } = response;
        const { message } = data;
        return { message };
    }
}