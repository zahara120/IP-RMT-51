import { createSlice } from "@reduxjs/toolkit";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    all: [],
  },
  reducers: {
    getAllRecipe(state, action){
        state.all = action.payload
    }
  },
});


export const { getAllRecipe } = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;