import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/products-slice";
import { ProductsState } from "./slices/products-slice";
import { cartReducer } from "./slices/cart-slice";

export interface Store {
  products: ProductsState;
  cart: [];
}

const store = configureStore<Store>({
  reducer: { products: productsReducer, cart: cartReducer },
});

export default store;
