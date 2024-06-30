import { configureStore } from '@reduxjs/toolkit'
import cartCounterSlice from './features/Counter/cartCounterSlice'
import notificationCounterSlice from './features/Counter/notificationCounterSlice'
import AuthSlice from './features/Auth'

export const store = configureStore({
  reducer: {
    cartCounter: cartCounterSlice,
    notiCounter: notificationCounterSlice,
    authUser: AuthSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch