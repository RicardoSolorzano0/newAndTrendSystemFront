export const authStore = (set) => {
    return {
        users: {
            userName: "",
            email: "",
            rol: "",
            id: "",
            token: "",
            status: "",
            img: "",
        },
        statusAuth: "not-authenticated", // 'loading', 'authehnticated', 'not-authenticated'
        logout: () => set({ statusAuth: "not-authenticated" }),
        login: () => set({ statusAuth: "authenticated" }),
        // setUser: (user) => set({ user }),
    }
}