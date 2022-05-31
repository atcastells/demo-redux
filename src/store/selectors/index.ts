import { ICampaign } from './../../types/campaign';
import { iBanner } from './../../types/banner';
import { iAppStore } from './../reducers/apps';
import { iCard } from './../../types/payments';
import { getAppList } from './../../utils/api';
import { restaurantHasTimeTable } from 'src/utils/restaurant';
import { IUserAddress } from './../../types/userAddress';
import { iDelivery } from './../../types/deliveryTypes';
import { iOrder } from '../../types/order';
import { IRestaurant } from './../../types/restaurantTypes';
import { IOrganization } from 'src/types/organizationTypes';
import { ICardStore } from '../reducers/user';
import { getAssets } from 'src/assets/assets';


export const getUserDataSelector = (state: any) => {
  if(!state.user || state.user && !state.user.userData) {
    return null;
  }
  return state.user.userData;
}

export const getUser = (state) => {
    if(!state.auth.user) {
      return null
    }
    return state.auth.user || []
  }
  
  export const getToken = (state) => {
    if(!state.auth.token) {
        return null
      }
      return state.auth.token || []
  }

  export const getOrderSelector = (orderId: string) => (state: any) => {
    if(!state.orders) {
      return null
    }
    return state.orders.find((order: iOrder) => order._id === orderId)
  }

  export const getOrdersSelector = (state): iOrder[] => {
    if(!state.orders) {
      return []
    }
    return state.orders
  }

  export const getDeliveriesSelector = (state): iDelivery[] => {
    if(!state.deliveries) {
      return []
    }
    return state.deliveries
  }

  export const getOrganizationsSelector = (state) => {
    if(!state.organizations) {
      return []
    }
    return state.organizations as IOrganization[]
  }

  export const getRestaurantsSelector = (state) => {
    if(!state.restaurants) {
      return []
    }
    return state.restaurants.filter(r => restaurantHasTimeTable(r)) as IRestaurant[]
  }

export const getUserSelector = (state) => {
  if(!state.user) {
    return null
  }
  return state.user
}
export const getUserSelectedAddress = (state) => {
  if((state.user && !state.user.selectedAddress) || !state.user) {
    return null
  }
  return state.user.selectedAddress as IUserAddress
}

export const getUserAddressesSelector = (state) => {
  if(state.user && !state.user.addresses) {
    return null
  }

  return state.user.addresses as {[key: string]: IUserAddress}
}

export const getOrganizationRestaurantsSelector = (organizationId) => (state) => {
  if(!state.restaurants) {
    return []
  }

  return state.restaurants.filter(r => r.organization._id === organizationId) as IRestaurant[]

}
export const getRestaurantsInRangeSelector = (state) => {
  const restaurants = state.restaurants

  if(!restaurants) return []

  const filteredRestaurants = restaurants.filter((r: IRestaurant) => r.customerInRange ).sort((a, b) => a.distanceToCustomer - b.distanceToCustomer)
  if(!filteredRestaurants) return []

  return filteredRestaurants
}

export const getDishesSelector = (state) => {
  if(!state.dishes || state.dishes && !Object.keys(state.dishes).length) {
    return null
  }

  return state.dishes
}

export const getMyAddressesModalOpenSelector = (state) => {
  if(!state.ui) {
    return false
  }

  return state.ui.myAddressesModalOpen
}

export const getDefaultTypeOrder = (state) => {
  if(!state.ui) {
    return null
  }

  return state.ui.defaultTypeOrder
}

export const getTypeOrderSelected = (state) => {
  if(!state.ui) {
    return null
  }

  return state.ui.typeOrderSelected
}

export const getUrlToNavigate = (state) => {
  if(!state.ui) {
    return null
  }
  
  return state.ui.urlToNavigate
}

export const getAddressWarningModalOpenSelector = (state) => {
  if(!state.ui) {
    return false
  }

  return state.ui.noAddressWarningModal
}

export const getRestaurantPopupShown = (restaurantId: string) => (state) => {
  if(!state.ui || state.ui && (!state.ui.popups || !state.ui.popups[restaurantId])) {
    return false
  } 
  return state.ui.popups[restaurantId] 
}
export const getLastRestaurantTypeOrder = (restaurantId: string) => (state) => {
  if(!state.ui || state.ui && (!state.ui.restaurantTypeOrder || !state.ui.restaurantTypeOrder[restaurantId])) {
    return null
  }  
  return state.ui.restaurantTypeOrder[restaurantId]
}

  
  
export const getRestaurantDishesSelector = (restaurantId) => (state) => {
  if(!state.dishes || state.dishes && !state.dishes[restaurantId]) {
    return null
  }

  return state.dishes[restaurantId].docs
}

export const getCartSelector = (state) => {
  if(!state.cart || state.cart && !Object.keys(state.cart).length) {
    return null
  }

  return state.cart
}

export const getCacheKey = (cacheKey: string, valueHash: string) => (state) => {
  if(!state.cache || state.cache && !state.cache[cacheKey]) {
    return null
  }

  return state.cache[cacheKey][valueHash]
}

export const getCacheSelector = (state) => {
  if(!state.cache || state.cache && !Object.keys(state.cache).length) {
    return null
  }

  return state.cache
}

export const getAppListSelector = (state): iAppStore => {
  if(!state.apps || state.apps && !Object.keys(state.apps).length) {
    return null
  }

  return state.apps 
}

export const getCardListOpenSelector = (state): boolean => {
  if(!state.ui) {
    return false
  }

  return state.ui.cardListOpen
}
export const getAuthOpenSelector = (state) => {
  if(!state.ui) {
    return false
  }

  return state.ui.authModalOpen
}

export const getCartOpenSelector = (state) => {
  if(!state.ui) {
    return false
  }

  return state.ui.cartOpen
}

export const getPaymentMethodsSelector = (state): iCard[] => {
  if(!state.user?.paymentMethods) {
    return []
  }

  const paymentMethodsStore: ICardStore = state.user.paymentMethods 

  return Object.keys(paymentMethodsStore).map(key => paymentMethodsStore[key].card)
}

export const getSelectedPaymentMethodSelector = (state): iCard => {
  if(!state.user?.paymentMethods) {
    return null
  }

  const paymentMethodsStore: ICardStore = state.user.paymentMethods 
  const selectedPaymentMethod =  Object.keys(paymentMethodsStore).map(key => paymentMethodsStore[key]).filter(pm => pm.selected)

  if(selectedPaymentMethod.length) {
    return selectedPaymentMethod[0].card
  }
}

export const getBannersSelector = (state): iBanner[] => {
  if(!state.ui.banners) {
    return []
  }

  return state.ui.banners
}

export const getCampaignsSelector = (state): ICampaign[] => {
  if(!state.ui.campaigns) {
    return []
  }

  return state.ui.campaigns
}