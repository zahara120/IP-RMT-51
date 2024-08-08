import { configureStore } from "@reduxjs/toolkit";
import { recipesReducer } from "./recipe";
import { usersReducer } from "./user";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    users: usersReducer,
  },
});
