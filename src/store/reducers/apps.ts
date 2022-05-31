import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApp } from "src/types/app";

export const appSlice = createSlice({
    name: 'appList',
initialState: {} as iAppStore,
reducers: {
    addAppsAction: (state, action: PayloadAction<IApp>) => {
        const orgId = action.payload.orgsId[0]
        state[orgId] = action.payload;
    }
}
})

export const { addAppsAction } = appSlice.actions;
export default appSlice.reducer;

export interface iAppStore {
    [key: string]: IApp
}