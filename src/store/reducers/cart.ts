import { IDiscount } from './../../types/discounts';
import { TYPEORDERS } from 'src/utils/restaurant';
import { iDeliveryDetails } from './../../types/delivery';
import { IRestaurantCart, ICartStore, ICartItem } from './../../types/cart';
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'carts',
    initialState: {} as ICartStore,
    reducers: {
        removeCartAction: (state, action) => {
            const {restaurantId} = action.payload

            delete state[restaurantId]
        },
        removeCartItemAction: (state, action) => {
            const {restaurantId, index} = action.payload
            state[restaurantId].items.splice(index, 1)
        },
        setActiveCartAction: (state, action) => {
            const {restaurantId} = action.payload

            if(restaurantId) {
                Object.keys(state).forEach(k => {
                    state[k].activeCart = k === restaurantId
                })
            }
        },
        addOrderIdAction: (state, action) => {
            const {restaurantId, orderId} = action.payload
            if(state[restaurantId]) state[restaurantId].orderId = orderId
        },
        setCartDeliveryDetailsAction: (state, action) => {
            const {restaurantId, deliveryDetails} = action.payload
            if(state[restaurantId]) {
                state[restaurantId].deliveryDetails = deliveryDetails as iDeliveryDetails
            }
        },
        setCartDiscountAction: (state, action) => {
            const {restaurantId, discount} = action.payload
            if(state[restaurantId]) {
                state[restaurantId].discountSelected = discount as IDiscount
            }
        },
        addDishToCartAction: (state, action) => {
            const {restaurantId, cartItem, quantity, typeOrder, deliveryDetails}: iAddDishToCartActionProps = action.payload
            if(restaurantId) {
                Object.keys(state).map(k => {
                    state[k].activeCart = k === restaurantId
                })
                let restaurantCart: IRestaurantCart = state[restaurantId]
                let tempItems = restaurantCart ? [...restaurantCart.items, cartItem] : [cartItem]
                let total: number = 0;

                tempItems.forEach(i => {
                    total += i.amount * i.quantity
                })
                state[restaurantId] = {
                    ...state[restaurantId],
                    typeOrder,
                    items: tempItems,
                    totalPrice: total,
                    activeCart: true
                }

                if(typeOrder === TYPEORDERS.DELIVERY) {
                    if(deliveryDetails) {
                        if(!state[restaurantId].deliveryDetails) state[restaurantId].deliveryDetails = {}
                        state[restaurantId].deliveryDetails.deliveryPrice = deliveryDetails.deliveryPrice
                    }                    
                }

            }
        }
    }
})

export const {setCartDiscountAction, addDishToCartAction, setCartDeliveryDetailsAction, setActiveCartAction, removeCartItemAction, removeCartAction, addOrderIdAction} = cartSlice.actions

export default cartSlice.reducer

interface iAddDishToCartActionProps {
    restaurantId: string,
    cartItem: ICartItem,
    quantity: number,
    typeOrder: string,
    deliveryDetails: iDeliveryDetails
}