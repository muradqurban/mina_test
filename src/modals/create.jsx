import { useState,useEffect } from 'react';
import { Modal, Input, Select } from 'antd';
 import { destroyModal, useTableData, addNewCell } from '../utils';


export default function CreateModal ({openState}) {
    const [isOpen, setIsOpen] = useState(openState);
    const [newData,setNewData] = useState({
        id: 0,
        len: "",
        wkt: "",
        status: 0
    })
    const data = useTableData()  

    useEffect(()=>{
            const lastData = data.reduce((a,b)=>{
                return a.id > b.id ? a : b
            },data[0])
            const newId = lastData ? lastData.id + 1 : 0;
            setNewData({...newData,id: newId})

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isOpen])

    const handleChange = (e) => {
        if(e.target !== undefined){
            const { name, value } = e.target;
            setNewData({ ...newData, [name]: value });
        } else {
            setNewData({ ...newData, "status": e });
        }
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


    const handleSubmit = () => {
            addNewCell(newData)
            handleClose()        
        }
    



    return (
        <div>
            <Modal title="Add new Cell" open={isOpen} onOk={handleSubmit} onCancel={handleClose}>
                 <label htmlFor="len">Len</label>
                 <Input type="text" id="len" name="len" placeholder="Len" value={newData.len} onChange={handleChange} />
                 <label htmlFor="wkt">WKT</label>
                 <Input type="text" id="wkt" name="wkt" placeholder="WKT" value={newData.wkt} onChange={handleChange} />
                 <label htmlFor="status">Status</label>
                 <Select
                    id='status'
                    className='mt-2 ml-2'
                    defaultValue={newData.status}
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 0, label: '0' },
                        { value: 1, label: '1' },
                        { value: 2, label: '2' },
                        { value: 3, label: '3', disabled: true },
                    ]}
                />
            </Modal>
        </div>
    )
}
