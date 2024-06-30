import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface notificationCounter {
  value: number
}

const initialState: notificationCounter = {
  value: 5,
}

export const notificationCounterSlice = createSlice({
  name: 'notificationCounter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    reset: (state) => {
      state.value = 0
    }
  },
})

export const { increment, decrement, incrementByAmount, reset } = notificationCounterSlice.actions

export default notificationCounterSlice.reducer