import { createSlice } from "@reduxjs/toolkit";

export interface CategoriesState {
    filter: string;
}

const initialState: CategoriesState = {
    filter: 'smartphones'
}

const categoriesSlice = createSlice({
    name: 'categoriesState',
    initialState,
    reducers: {
        setFilter(state, filter){
            state.filter = filter.payload
        }
    }
})

export const { setFilter } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;