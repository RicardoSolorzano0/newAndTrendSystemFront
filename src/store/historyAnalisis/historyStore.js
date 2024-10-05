import { create } from 'zustand'

export const historyStore = create((set) => ({
    history: [],
    setHistory: (history) => set({ history }),
}))