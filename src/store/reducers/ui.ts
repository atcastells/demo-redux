import { ICampaign } from './../../types/campaign';
import { createSlice } from "@reduxjs/toolkit";
import { iBanner } from "src/types/banner";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        cartOpen: false,
        authModalOpen: false,
        cardListOpen: false,
        noAddressWarningModal: false,
        myAddressesModalOpen: false,
        urlToNavigate: '',
        restaurantTypeOrder: {} as IRestaurantDefaultTypeOrders,
        banners: [] as iBanner[],
        campaigns: [] as ICampaign[],
        popups: {} as IRestaurantPopupsShown
    },  
    reducers: {
        toggleCardListModal: (state) => {
            state.cardListOpen = !state.cardListOpen;
        },
        openCart: (state) => {
            state.cartOpen = true;
        },
        closeCart: (state) => {
            state.cartOpen = false;
        },
        toggleAuthModal: (state) => {
            state.authModalOpen = !state.authModalOpen;
        },
        toggleNoAddressWarningModal: (state) => {
            state.noAddressWarningModal = !state.noAddressWarningModal;
        },
        toggleMyAddressesModal: (state) => {
            state.myAddressesModalOpen = !state.myAddressesModalOpen;
        },
        setUrlToNavigate: (state, action) => {
            state.urlToNavigate = action.payload;
        },
        setBanners: (state, action) => {
            state.banners = action.payload;
        },
        setCampaigns: (state, action) => {
            state.campaigns = action.payload;
        },
        setRestaurantPopupsShown: (state, action) => {
            const {restaurantId} = action.payload;
            if(!state.popups) {
                state.popups = {};
            }
            state.popups[restaurantId] = true;
        },
        setRestaurantTypeOrder: (state, action) => {
            const {restaurantId, typeOrder} = action.payload;
            if(!state.restaurantTypeOrder) state.restaurantTypeOrder = {};
            state.restaurantTypeOrder[restaurantId] = typeOrder;            
        }
    }
});

export const {setRestaurantPopupsShown, setCampaigns, setBanners, setRestaurantTypeOrder, openCart,setUrlToNavigate,toggleAuthModal,toggleMyAddressesModal, closeCart, toggleCardListModal, toggleNoAddressWarningModal } = uiSlice.actions;

export default uiSlice.reducer;

interface IRestaurantDefaultTypeOrders {
    [key: string]: string;
}

interface IRestaurantPopupsShown {
    [key: string]: boolean;
}