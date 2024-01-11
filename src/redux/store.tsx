import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { productsReducer } from "./slices/products-slice";
import { OrderState, orderReducer } from "./slices/order-slice";
import { cartReducer } from "./slices/cart-slice";

import { persistReducer } from "redux-persist";

import { CartState } from "./slices/cart-slice";
import { ProductsState } from "./slices/products-slice";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  // config to persist store.
  key: "root",
  version: 1,
  storage,
};

export interface Reducers {
  // type-definition for reducers.
  products: ProductsState;
  cart: CartState;
  order: OrderState;
}

const reducer = combineReducers({
  // combining the reducers and passing it to persist-reducer.
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer); // setting the persisted-reducer by passing in the config and combinedReducers.

const store = configureStore({
  // passing the persisted-reducer to the store.
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
