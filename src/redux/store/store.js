import {configureStore} from "@reduxjs/toolkit";
import settingsReducer from '../state-slice/settings-slice.js';
import profileReducer from '../state-slice/profile-slice.js'
import categoryReducer from '../state-slice/category-slice.js'
import productReducer from '../state-slice/product-slice'
import cartReducer from '../state-slice/cart-slice'
import orderReducer from '../state-slice/order-slice'


export default configureStore({
    reducer: {
        settings: settingsReducer,
        profile: profileReducer,
        category:categoryReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer
    }
})