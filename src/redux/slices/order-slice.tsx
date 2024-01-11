import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "./cart-slice";

export interface OrderItem {
  orders: Array<CartItem>;
  customer: Object;
}

export interface OrderState {
  orders: Array<OrderItem>;
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    newOrder(state, action) {
      state.orders.push(action.payload);
    },
  },
});

export const orderReducer = orderSlice.reducer;
export const { newOrder } = orderSlice.actions;
