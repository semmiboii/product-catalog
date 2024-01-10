import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/products-slice";

import { cartReducer } from "./slices/cart-slice";
import { persistReducer } from "redux-persist";

import { CartState } from "./slices/cart-slice";
import { ProductsState } from "./slices/products-slice";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

export interface Reducers {
  products: ProductsState;
  cart: CartState[];
}

const reducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware() 
});

export default store;
