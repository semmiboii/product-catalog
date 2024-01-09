import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/products-slice";
import { ProductsState } from "./slices/products-slice";

export interface Store {
  products: ProductsState;
}

const store = configureStore<Store>({
  reducer: { products: productsReducer },
});

export default store;
