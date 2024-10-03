export const usersInitValue = {
    userName: "",
    email: "",
    _id: "",
    accessToken: null,
    refreshToken: null,
}

export const authStore = (set) => {
    return {
        user: usersInitValue,
        statusAuth: "not-authenticated", // 'loading', 'authehnticated', 'not-authenticated'
        logoutStore: () => set({ statusAuth: "not-authenticated" }),
        loginStore: () => set({ statusAuth: "authenticated" }),
        setUser: (user) => set({ user }),
    }
}