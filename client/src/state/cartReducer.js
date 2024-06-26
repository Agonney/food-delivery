import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
    total: []
}

export const cartSlice = createSlice({
  name: 'cartItems',
  initialState: initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload)
    },
    removeItem: (state, action) => {
      const id = action.payload.id
      const itemToRemove = state.items.find(i => i.id === id)
      const totalPriceToRemove = state.total.find(i => i.id === id)
      return state = {items: state.items.filter(item => item !== itemToRemove), total: state.total.filter(item => item !== totalPriceToRemove)}
    },
    addPrice: (state, action) => {
      const id = action.payload.id
      const totalPrice = state.total.find(i => i.id === id)
      if(!totalPrice){
        state.total.push(action.payload)
      }
      else if(totalPrice && totalPrice.price !== action.payload.price){
        const changedTotalPrice = { ...totalPrice, price: action.payload.price}
        return state = { ...state, total: state.total.map(totalPrice => totalPrice.id !== id ? totalPrice : changedTotalPrice)}
      }
    },
    reset: () => initialState
  },
})

export const { addItem, removeItem, addPrice, reset } = cartSlice.actions

export default cartSlice.reducer