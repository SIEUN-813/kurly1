import { createSlice } from "@reduxjs/toolkit";

const initState = {
    current : {}
}

const viewProductReducer = createSlice({
    name: 'viewProduct',
    initialState: initState,
    reducers: {
        viewProduct: (state, action) => {
            state.current = action.payload
        }
    }
})

export default viewProductReducer.reducer;
export const { viewProduct } = viewProductReducer.actions;