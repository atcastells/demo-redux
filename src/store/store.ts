import  cacheSlice  from './reducers/cache';
import  appsSlice  from './reducers/apps';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/auth'
import deliveriesReducer from "./reducers/deliveries";
import ordersReducer from './reducers/orders'
import organizationsReducer from './reducers/organizations'
import restaurantsReducer from './reducers/restaurants'
import userReducer from './reducers/user'
import dishesReducer from './reducers/dishes'
import cartSlice from './reducers/cart';
import ui from './reducers/ui'
import storage from "redux-persist/lib/storage";
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

const reducers = combineReducers({
    auth: authReducer,
    orders: ordersReducer,
    deliveries: deliveriesReducer,
    organizations: organizationsReducer,
    restaurants: restaurantsReducer,
    user: userReducer,
    dishes: dishesReducer,
    cart: cartSlice,
    cache: cacheSlice,
    apps: appsSlice,
    ui: ui
})

const persistConfig = {
    key: 'root',
    storage
};
const persistedReducers = persistReducer(persistConfig, reducers)

export default configureStore({
    reducer: persistedReducers,
    middleware: [thunk]
})