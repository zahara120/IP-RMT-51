import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    allRecipes: [],
    popularRecipes: [],
    details: {},
  },
  reducers: {
    setAllRecipes(state, action) {
      state.allRecipes = action.payload;
    },
    setPopularRecipes(state, action) {
      state.popularRecipes = action.payload;
    },
    setDetails(state, action) {
      state.details = action.payload;
    },
  },
});

export const { setAllRecipes, setPopularRecipes, setDetails } = recipesSlice.actions;
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

export const fetchDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/recipes/${id}`);
      dispatch(setDetails(data));
    } catch (error) {
      console.log(error);
    }
  };
};