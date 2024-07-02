import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './features/Auth'

export const store = configureStore({
  reducer: {
    authUser: AuthSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch