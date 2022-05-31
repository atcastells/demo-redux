import { createSlice } from "@reduxjs/toolkit";

export const organizationsSlice = createSlice({
    name: 'organizations',
    initialState: [] as any[],
    reducers: {
        addOrganizationsAction: (state, action) => action.payload
    }
})

export const {addOrganizationsAction} = organizationsSlice.actions

export default organizationsSlice.reducer