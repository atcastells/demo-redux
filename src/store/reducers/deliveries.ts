import { iDelivery } from 'src/types/deliveryTypes';
import { createSlice } from "@reduxjs/toolkit";

export const deliveriesSlice = createSlice({
    name: 'deliveries',
    initialState: [] as iDelivery[],
    reducers: {
        addDeliveriesAction: (state, action) => action.payload
    }
})

export const {addDeliveriesAction} = deliveriesSlice.actions

export default deliveriesSlice.reducer