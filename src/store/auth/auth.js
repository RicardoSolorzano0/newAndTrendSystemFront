import axios from "axios";

export const login = async (email, password) => {
    try {
        const { data } = await axios.post('http://localhost:5000/users/login', { email, password });
        const { accessToken, refreshToken, user } = data;
        return { accessToken, refreshToken, user };
    } catch (error) {
        console.error('Error durante el login', error);
    }
};

export const register = async (username, email, password) => {
    try {
        const { data } = await axios.post('http://localhost:5000/users/register', { username, email, password });
        return { ...data };
    } catch (error) {
        console.log("Error en register", error)
        const { response } = error;
        const { data } = response;
        const { msg } = data
        return { msg }
    }
}


export const refreshAccessToken = async (refreshToken) => {
    try {
        const { data } = await axios.post('/refresh-token', { refreshToken });
        const { accessToken } = data;
        localStorage.setItem('accessToken', accessToken);
        return { accessToken };
    } catch (error) {
        console.error('Error refrescando token', error);
    }
};