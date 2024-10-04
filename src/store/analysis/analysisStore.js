import { create } from 'zustand'

export const analysisStore = create((set) => ({
    analysis: [],
    setAnalysis: (analysis) => set({ analysis }),
}))