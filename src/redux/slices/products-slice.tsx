import { createSlice } from "@reduxjs/toolkit";

export interface ProductsState {
  categoryFilter: string;
  priceRange: [number, number];
}

const initialState: ProductsState = {
  categoryFilter: "smartphones",
  priceRange: [0, 100],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.categoryFilter = action.payload;
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
  },
});

export const { setFilter, setPriceRange } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;