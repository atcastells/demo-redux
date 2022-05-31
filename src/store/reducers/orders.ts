import { iOrder } from '../../types/order';
import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: [] as iOrder[],
    reducers: {
        addOrdersAction: (state, action) => action.payload,
        addOrderAction: (state, action) => [...state, action.payload],
    }
})

export const {addOrdersAction, addOrderAction} = ordersSlice.actions

export default ordersSlice.reducer