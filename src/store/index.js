import { configureStore } from "@reduxjs/toolkit";
import excelSlice from "./excelSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
    reducer:{
        excelSlice,
        modalSlice
    },
})

export default store

