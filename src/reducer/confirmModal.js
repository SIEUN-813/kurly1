import { createSlice } from "@reduxjs/toolkit"

const initState = {
    isConfirmModal: false,
    confirmMsg: '',
    signupOk: false
}

const confirmModalReducer = createSlice({
    name: 'confirmModal',
    initialState: initState,
    reducers: {
        confirmModal: (state, action)=>{
            state.isConfirmModal = action.payload.isConfirmModal;
            state.confirmMsg = action.payload.confirmMsg;
            state.signupOk = action.payload.signupOk;
        }
    }
});

export default confirmModalReducer.reducer;
export const { confirmModal } = confirmModalReducer.actions;