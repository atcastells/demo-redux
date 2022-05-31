import { IRestaurant } from './../../types/restaurantTypes';
import { createSlice } from "@reduxjs/toolkit";

export const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState: [] as IRestaurant[],
    reducers: {
        addRestaurantsAction: (state, action) => action.payload,
        addRestaurantAction: (state, action) => {
            return state.map(r => {
                if(r._id === action.payload._id){
                    return action.payload
                } else {
                    return r
                }
            })
        }
    }
})

export const {addRestaurantsAction, addRestaurantAction} = restaurantsSlice.actions

export default restaurantsSlice.reducer