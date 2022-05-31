import { IDishStore } from './../../types/dish';
import { createSlice } from "@reduxjs/toolkit";

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState: {} as IDishStore,
    reducers: {
        addDishesAction: (state, action) => {
            const {restaurantId, dishes} = action.payload
            if(restaurantId) {
                state[restaurantId] = dishes
            }
        }
    }
})

export const {addDishesAction} = dishesSlice.actions

export default dishesSlice.reducer