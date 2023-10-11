import { useState,useEffect } from 'react';
import { Modal, Input } from 'antd';
 import { useModal, destroyModal, useTableData, addNewCell, editCell } from '../utils';


export default function ModalComponent ({openState}) {
    const modals = useModal()
    const [isOpen, setIsOpen] = useState(openState);
    const [newData,setNewData] = useState({
        id: 0,
        len: "",
        wkt: "",
        status: ""
    })
    const data = useTableData()  

    useEffect(()=>{
        if(modals[0].name === "create"){
            const lastData = data.reduce((a,b)=>{
                return a.id > b.id ? a : b
            },data[0])
            const newId = lastData ? lastData.id + 1 : 0;
            setNewData({...newData,id: newId})
        } else if(modals[0].name === "edit"){
            setNewData({
                id:modals[0].data.id,
                len:modals[0].data.len,
                wkt:modals[0].data.wkt,
                status:modals[0].data.status,
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isOpen])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    }

    const handleSubmit = () => {
        if(modals[0].name === "create"){
            addNewCell(newData)

        } else if(modals[0].name === "edit"){
            editCell(newData)
        }
        setIsOpen(false)
        destroyModal()
        setNewData({
            id: 0,
            len: "",
            wkt: "",
            status: ""
        })
    }
    
    const handleClose = () => {
        setIsOpen(false)
        destroyModal()
        setNewData({
            id: 0,
            len: "",
            wkt: "",
            status: ""
        })
    }


    return (
        <div>
            <Modal title={modals[0].name === "create" ? "Add Data" : "Edit Data"} open={isOpen} onOk={handleSubmit} onCancel={handleClose}>
                 <label htmlFor="len">Len</label>
                 <Input type="text" id="len" name="len" placeholder="Len" value={newData.len} onChange={handleChange} />
                 <label htmlFor="wkt">WKT</label>
                 <Input type="text" id="wkt" name="wkt" placeholder="WKT" value={newData.wkt} onChange={handleChange} />
                 <label htmlFor="status">Status</label>
                 <Input type="text" id="status" name="status" placeholder="Status" value={newData.status} onChange={handleChange} />
            </Modal>
        </div>
    )
}
