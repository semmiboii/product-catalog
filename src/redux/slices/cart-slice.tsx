import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../../components/products/Products";

export interface CartItem {
  product: ProductType;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action:PayloadAction<ProductType>) {
      const newItem: ProductType = action.payload; 
      const existingItem = state.items.find(item => item.product.id === newItem.id);

      if(existingItem){
        existingItem.quantity++;
      }else{
        state.items.push({product: newItem, quantity: 1});
      }

      state.total += newItem.price;
    },
    removeFromCart(state, action: PayloadAction<number>) {
        const id: number = action.payload;
        const existingItem = state.items.find((item) => item.product.id === id);
        if(existingItem){
          if(existingItem.quantity === 1){
          state.items = state.items.filter(item => item.product.id !== id)
        }else{
          existingItem.quantity--;
        }
        state.total -= existingItem.product.price;
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
