import { createSlice } from "@reduxjs/toolkit";

export interface ProductsState {                                                           // type-definition for filtering the products.
  categoryFilter: string;
  priceRange: [number, number];
}

const initialState: ProductsState = {                                                      // initial State for filtering the products.
  categoryFilter: "",
  priceRange: [0, 1000],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilter(state, action) {                                                             // setting category to filter within.
      state.categoryFilter = action.payload;
    },
    setPriceRange(state, action) {                                                         // setting price-range to filter within.
      state.priceRange = action.payload;
    },
  },
});

export const { setFilter, setPriceRange } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
