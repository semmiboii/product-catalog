import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../../components/products/product-ui/Products";

export interface CartItem {
  // cart-item type definition.
  product: ProductType;
  quantity: number;
}

export interface CartState {
  // initialCartState type definition.
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  // initialCartState
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProductType>) {
      // addToCart: function to add items to the cart.
      const newItem: ProductType = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ product: newItem, quantity: 1 });
      }

      state.total += newItem.price;
    },
    removeFromCart(state, action: PayloadAction<number>) {
      // removeFromCart: function to remove items from cart.
      const id: number = action.payload;
      const existingItem = state.items.find((item) => item.product.id === id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.product.id !== id);
        } else {
          existingItem.quantity--;
        }
        state.total -= existingItem.product.price;
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions; // exporting cart-actions to access the functions from react-components.
export const cartReducer = cartSlice.reducer; // exporting reducer to the redux-store.
