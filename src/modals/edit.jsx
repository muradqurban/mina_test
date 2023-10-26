import { useState } from 'react';
import { Modal, Input, Select } from 'antd';
 import { useModal, destroyModal, editCell } from '../utils';


export default function EditModal ({openState}) {
    const modals = useModal()
    const [isOpen, setIsOpen] = useState(openState);
    const [newData,setNewData] = useState({
        id: modals[0].data.id,
        len:modals[0].data.len,
        wkt:modals[0].data.wkt,
        status:modals[0].data.status,
    })

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
            editCell(newData)
            handleClose()
    }
  
    return (
        <div>
            <Modal title="Edit Cell" open={isOpen} onOk={handleSubmit} onCancel={handleClose}>
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
