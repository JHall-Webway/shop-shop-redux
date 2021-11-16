import { createSlice } from '@reduxjs/toolkit';
export const reduxSlice = createSlice({
    name: 'global',
    initialState: {
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: ''
    },
    reducers: {
        r_UPDATE_PRODUCTS: (state, { payload }) => {
            state.products = payload;
        },
        r_UPDATE_CATEGORIES: (state, { payload }) => {
            state.categories = payload;
        },
        r_UPDATE_CURRENT_CATEGORY: (state, { payload }) => {
            state.currentCategory = payload;
        },
        r_ADD_TO_CART: (state, { payload }) => {
            state.cartOpen = true;
            state.cart = [...state.cart, payload]
        },
        r_ADD_MULTIPLE_TO_CART: (state, { payload }) => {
            state.cartOpen = true;
            state.cart = [...state.cart, ...payload];
        },
        r_REMOVE_FROM_CART: (state, { payload }) => {
            let newState = state.cart.filter(product => product._id !== payload);
            state.cartOpen = newState.length > 0;
            state.cart = newState;
        },
        r_UPDATE_CART_QUANTITY: (state, { payload }) => {
            state.cartOpen = true;
            state.cart = state.cart.map(product => {
                if (payload._id === product._id) {
                    product.purchaseQuantity = payload.quantity;
                }
                return product;
            });
        },
        r_CLEAR_CART: (state, { payload }) => {
            state.cartOpen = false;
            state.cart = [];
        },
        r_TOGGLE_CART: (state) => {
            state.cartOpen = !state.cartOpen;
        }
    }
});

export const {
    r_UPDATE_PRODUCTS,
    r_UPDATE_CATEGORIES,
    r_UPDATE_CURRENT_CATEGORY,
    r_ADD_TO_CART,
    r_ADD_MULTIPLE_TO_CART,
    r_REMOVE_FROM_CART,
    r_UPDATE_CART_QUANTITY,
    r_CLEAR_CART,
    r_TOGGLE_CART
} = reduxSlice.actions;