import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modal:[]
}

const modalSlice = createSlice({
    name:"modalSlice",
    initialState,
    reducers:{
        Create: (state, action) => {
            state.modal = [...state.modal,action.payload]
        },
        Destroy: state => {
            state.modal = []
        }
    }

})

export const {Create,Destroy} = modalSlice.actions
export default modalSlice.reducer