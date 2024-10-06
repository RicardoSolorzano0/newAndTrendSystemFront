import analysisApi from "../../api/analysisApi";

export const analyzeSentiment = async (headlines, user, topic = "Análisis de Texto", language) => {
    try {
        const { data } = await analysisApi.post(`/`, { headlines, user, topic, language });
        return data
    } catch (error) {
        const { response } = error;
        const { data } = response;
        const { message } = data;
        return { message }
    }
};