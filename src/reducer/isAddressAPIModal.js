import { createSlice } from "@reduxjs/toolkit"

const initState = {
    isAddressAPIModal: false
}

const isAddressAPIModalReducer = createSlice({
    name: 'isAddressAPIModal',
    initialState: initState,
    reducers: {
        isAddressAPIModal: (state, action)=>{
            state.isAddressAPIModal = action.payload;
        }
    }
});

export default isAddressAPIModalReducer.reducer;
export const { isAddressAPIModal } = isAddressAPIModalReducer.actions;