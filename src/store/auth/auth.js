import authApi from "../../api/authApi";

export const login = async (username, password) => {
    try {
        const { data } = await authApi.post('/login', { username, password });
        const { accessToken, refreshToken } = data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return { accessToken, refreshToken };

    } catch (error) {
        console.error('Error during login', error);
    }
};

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return { accessToken: null, refreshToken: null };
};

export const refreshAccessToken = async (refreshToken) => {
    try {
        const { data } = await authApi.post('/refresh-token', { refreshToken });
        const { accessToken } = data;
        localStorage.setItem('accessToken', accessToken);
        return { accessToken };
    } catch (error) {
        console.error('Error refreshing token', error);
        logout();
    }
};