import { create } from 'zustand'

export const newsStore = create((set) => ({
    news: [],
    setNews: (news) => set({ news }),
}))