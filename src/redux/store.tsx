import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer } from "./slices/categories-slice";

const store = configureStore({
    reducer: { categories: categoriesReducer }
})

export default store