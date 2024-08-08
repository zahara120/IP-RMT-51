import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    allRecipes: [],
    popularRecipes: [],
  },
  reducers: {
    setAllRecipes(state, action) {
      state.allRecipes = action.payload;
    },
    setPopularRecipes(state, action) {
      state.popularRecipes = action.payload;
    },
  },
});

export const { setAllRecipes, setPopularRecipes } = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
export const fetchAllRecipes = (search, keyword, sort, page) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "get",
        url: "/recipes",
        params: {
          search,
          keyword,
          sort,
          "page[number]": page,
        },
      });
      dispatch(setAllRecipes(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchPopularRecipes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/recipes/popular");
      dispatch(setPopularRecipes(data));
    } catch (error) {
      console.log(error);
    }
  };
};
