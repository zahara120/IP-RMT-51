import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
    },
    reducers: {
        findUser: (state, action) => {
            state.users = action.payload;
        },
    }
})

export const { findUser } = usersSlice.actions
export const usersReducer = usersSlice.reducer