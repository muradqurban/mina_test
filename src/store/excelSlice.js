import { createSlice } from "@reduxjs/toolkit";

const initialState = {
data:[],
filteredData: [],
selectedData: [],
}





const excelSlice = createSlice({
    name: "excelSlice",
    initialState,
    reducers: {
        FileRead: (state,action) => {
        state.data = [...action.payload]
        },
        AddData: (state,action) => {
            state.data = [...state.data, action.payload]
        },
        EditData: (state,action) => {
            state.data = state.data.map((cell) => 
                cell.id === action.payload.id ? action.payload : cell)
        },
        DeleteData: (state,action) => {
            state.data = state.data.filter((cell)=>cell.id !== action.payload.id)
        },
        addFilteredData: (state,action) => {
            state.filteredData = []
            state.filteredData = [...action.payload]
        },
        deleteFilteredData: state => {
            state.filteredData = []
        },
        addSelectedData: (state,action) => {
            state.selectedData =[]
            state.selectedData = action.payload.slice(11,-1).split(',')
        }
    }
})

export const { FileRead, AddData, EditData, DeleteData, addFilteredData, deleteFilteredData, addSelectedData} = excelSlice.actions
export default excelSlice.reducer