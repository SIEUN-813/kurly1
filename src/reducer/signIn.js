import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logInInfo: null
}

const signInReducer = createSlice({
    name: 'signIn',
    initialState: initialState,
    reducers: {
        signIn: (state, action) => {
            state.logInInfo = action.payload;
        }
    }
})

export default signInReducer.reducer;
export const { signIn } = signInReducer.actions;