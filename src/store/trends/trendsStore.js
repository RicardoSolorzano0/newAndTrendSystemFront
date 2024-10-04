import { create } from 'zustand'

export const trendsStore = create((set) => ({
    trends: [],
    setTrends: (trends) => set({ trends }),
}))