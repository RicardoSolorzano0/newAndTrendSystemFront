import { create } from 'zustand'
import { authStore } from './auth/authStore'

export const store = create((set) => ({
    ...authStore(set),
}))