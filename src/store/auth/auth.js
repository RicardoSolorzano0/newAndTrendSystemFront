import axios from "axios";
import { jwtDecode } from "jwt-decode";

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

export const refreshAccessToken = async (token, refreshToken) => {
    try {
        //validando que el token no este expirado
        const { exp } = jwtDecode(token);

        const currentTime = Date.now();

        if (exp * 1000 < currentTime) {
            const { data } = await axios.post('http://localhost:5000/users/refresh-token', {
                token: refreshToken
            });
            return { data: { ...data } };
        } else {
            return { data: { accessToken: token } }
        }
    } catch (error) {
        console.error('Error al refrescar el token:', error);
    }
};