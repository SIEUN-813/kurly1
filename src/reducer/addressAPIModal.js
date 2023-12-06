import { createSlice } from "@reduxjs/toolkit"

const initState = {
    address: ''
}
const addressAPIModalReducer = createSlice({
    name: 'addressAPIModal',
    initialState: initState,
    reducers: {
        addressAPIModal: (state, action)=>{
            state.address = action.payload;
        }
    }
});

export default addressAPIModalReducer.reducer;
export const { addressAPIModal } = addressAPIModalReducer.actions;