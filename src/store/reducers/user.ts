import { iCard } from './../../types/payments';
import { deleteAddress, getUserAddresses, putUserAddress } from 'src/utils/api';
import { IUser } from './../../types/user';
import { IUserAddress } from 'src/types/userAddress';
import { createSlice } from "@reduxjs/toolkit"
import { encrypt } from 'src/utils/utils';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        addresses: {},
        paymentMethods: {} as ICardStore,
        selectedAddress: {},
        userData: {} as IUser
    },
    reducers: {
        removeUserDataAction: (state) => {
            state.userData = {} as IUser;
            state.addresses = {};
            state.selectedAddress = {};
        },
        setUserDataAction: (state, action) => {            
            state.userData = action.payload
        },
        deleteAddressAction: (state, action) => {
            const address: IUserAddress = action.payload
            if(address.addressLine1) {
                let hash = encrypt(address.addressLine1.replaceAll(' ', '').split(','))
                const id = address._id

                if(id) {
                    deleteAddress(id).then(res => {
                        console.log('[USERS-ADDRESS DELETE]',res)
                    })
                }
                delete state.addresses[hash]
            }
        },
        addAddressAction: (state, action) => {
            const address: IUserAddress = action.payload
            if(address.addressLine1) {
                    let hash = encrypt(address.addressLine1.replaceAll(' ', '').split(','))
                    state.addresses[hash] = address
            }
        },
        editAddressAction: (state, action) => {
            const oldAddress: IUserAddress = action.payload.old
            const newAddress: IUserAddress = action.payload.new

            if(oldAddress && newAddress) {
                const oldHash = encrypt(oldAddress.addressLine1.replaceAll(' ', '').split(','))
                const newHash = encrypt(newAddress.addressLine1.replaceAll(' ', '').split(','))

                delete state.addresses[oldHash]
                state.addresses[newHash] = newAddress
                state.selectedAddress = newAddress
            }
        },
        setAddressesAction: (state, action) => {
            const addresses: IUserAddress[] = action.payload
            addresses.forEach(address => {
                if(address.location) {
                    let hash = encrypt(address.addressLine1.replaceAll(' ', '').split(','))
                    state.addresses[hash] = address
                }                
            })
        },
        setSelectedAddressAction: (state, action) => {
            state.selectedAddress = action.payload
        },
        removeSelectedAddressAction: (state) => {
            state.selectedAddress = null
        },
        setCardsAction: (state, action) => {
            const cards: iCard[] = action.payload
            state.paymentMethods = {}
            cards.forEach(card => {
                let hash = encrypt([card.id])
                state.paymentMethods[hash] = {
                    card,
                    selected: false
                }
            })
        },

        addCardAction: (state, action) => {
            const card: iCard = action.payload
            if(card.id) {
                const hash = encrypt([card.id])
                if(!state.paymentMethods) state.paymentMethods = {}
                state.paymentMethods[hash] = {
                    card,
                    selected: false
                }
            }
        },
        removeCardAction: (state, action) => {
            const card: iCard = action.payload
            if(card.id) {
                const hash = encrypt([card.id])
                delete state.paymentMethods[hash]
            }
        },
        setSelectedCardAction: (state, action) => {
            const card: iCard = action.payload
            if(card.id) {
                const hash = encrypt([card.id])
                if(state.paymentMethods) {
                    Object.keys(state.paymentMethods).forEach(key => {
                        state.paymentMethods[key].selected = false
                    })
                    if(state.paymentMethods[hash]) state.paymentMethods[hash].selected = true
                }
            }
        }
    }
})

export const {setSelectedCardAction, setCardsAction, removeCardAction, addCardAction,removeUserDataAction,setAddressesAction, addAddressAction, setSelectedAddressAction, deleteAddressAction, removeSelectedAddressAction, editAddressAction, setUserDataAction} = userSlice.actions

export default userSlice.reducer

export interface ICardStore {
    [key:string]: {
        selected: boolean,
        card: iCard
    }
}