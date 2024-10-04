import axios from "axios";

export const analyzeSentiment = async (headlines, user, topic = "Análisis de Texto") => {
    try {
        const { data } = await axios.post(`http://localhost:5000/analyze`, { headlines, user, topic });
        return data
    } catch (error) {
        const { response } = error;
        const { data } = response;
        const { message } = data;
        return { err: message }
    }
};