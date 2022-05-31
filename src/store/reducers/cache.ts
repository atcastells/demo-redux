import { createSlice } from "@reduxjs/toolkit";
import { addMinutes, addSeconds } from "date-fns";

export const cacheSlice = createSlice({
    name: 'cache',
    initialState: {} as ICacheStore,
    reducers: {
        deleteKey: (state, action) => {
            const {cacheKey, valueHash} = action.payload
            if(cacheKey && valueHash ) {
                delete state[cacheKey][valueHash]
            }
        },
        storeKey: (state, action) => {
            const {cacheKey, valueHash, value, duration} = action.payload
            if(cacheKey && valueHash && value && duration) {
                if(!state[cacheKey]) state[cacheKey] = {}
                    state[cacheKey][valueHash] = {
                        value,
                        duration
                }
            }
        }
    }
})

export const {deleteKey, storeKey} = cacheSlice.actions

export default cacheSlice.reducer


export interface ICacheStore {
    [key:string]: {
        [key:string]: {
            value: string,
            duration: Date
        }
    }
}