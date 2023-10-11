import { createRoot } from "react-dom/client";
import store from "../store";
import { FileRead,AddData, EditData, DeleteData, addFilteredData, deleteFilteredData, addSelectedData } from "../store/excelSlice";
import { Create,Destroy } from "../store/modalSlice";
import { useSelector } from "react-redux";


export const uploadFile = file => {
    store.dispatch(FileRead(file))
}

export const addNewCell = data => {
    store.dispatch(AddData(data))
}

export const useTableData = () => {
    return useSelector((state)=>state.excelSlice.data);
}

export const editCell = cell => {
    store.dispatch(EditData(cell))
}

export const deleteCell = cell => {
    store.dispatch(DeleteData(cell))
}

export const createFilteredData = data => {
    store.dispatch(addFilteredData(data))
}

export const useFilteredData = () => {
    return useSelector(state=>state.excelSlice.filteredData)
}

export const clearFilteredData = () => {
    store.dispatch(deleteFilteredData())
}

export const useSelectedData = () => {
    return useSelector(state=>state.excelSlice.selectedData)
}

export const setSelectedData = data => {
    store.dispatch(addSelectedData(data))
}

export const useModal = () => {
    return useSelector(state => state.modalSlice.modal)
}

export const createModal = (name,data) => {
    store.dispatch(Create({name,data}))
}

export const destroyModal = () => {
    store.dispatch(Destroy())
}

export const reactFormatter = table => {
    return function customFormatter(cell, formatterParams, onRendered) {
        const renderFn = () => {
            const cellEl = cell.getElement()
            if(cellEl) {
                const formatterCell = cellEl.querySelector('.formatterCell')
                if(formatterCell) {
                    const root = createRoot(formatterCell)
                    return root.render(table)
                }
            }
        }
        onRendered(renderFn)
        
        return '<div class="formatterCell"></div>'
    }
}