import { jwtDecode } from "jwt-decode";
import usersApi from "../../api/usersApi";

export const login = async (email, password) => {
    try {
        const { data } = await usersApi.post('/login', { email, password });
        const { accessToken, refreshToken, user } = data;
        return { accessToken, refreshToken, user };
    } catch (error) {
        const { response } = error;
        const { data } = response;
        const { message } = data
        return { message }
    }
};

export const register = async (username, email, password) => {
    try {
        const { data } = await usersApi.post('/register', { username, email, password });
        return { ...data };
    } catch (error) {
        const { response } = error;
        const { data } = response;
        const { message } = data
        return { message }
    }
}

export const refreshAccessToken = async (token, refreshToken) => {
    try {
        //validando que el token no este expirado
        const { exp } = jwtDecode(token);

        const currentTime = Date.now();

        if (exp * 1000 < currentTime) {
            const { data } = await usersApi.post('/refresh-token', {
                token: refreshToken
            });
            return { data: { ...data } };
        } else {
            return { data: { accessToken: token } }
        }
    } catch (error) {
        const { response } = error;
        const { data } = response;
        const { message } = data
        return { message }
    }
};