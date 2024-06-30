import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface cartCounterState {
  value: number
}

const initialState: cartCounterState = {
  value: 0,
}

export const cartCounterSlice = createSlice({
  name: 'cartCounter',
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

export const { increment, decrement, incrementByAmount, reset } = cartCounterSlice.actions

export default cartCounterSlice.reducer