import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { findUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

export const fetchUsers = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/recipes/${id}`);
      dispatch(setDetails(data));
    } catch (error) {
      console.log(error);
    }
  };
};
