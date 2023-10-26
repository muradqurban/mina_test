import { useState } from 'react';
import { Modal } from 'antd';
 import { useModal, destroyModal, deleteCell } from '../utils';


export default function DeleteModal ({openState}) {
    const modals = useModal()
    const [isOpen, setIsOpen] = useState(openState);

    const handleClose = () => {
        setIsOpen(false)
        destroyModal()
    }

    const handleSubmit = () => {
            deleteCell(modals[0].data)
            handleClose()
    }
    

    return (
        <div>
            <Modal title="Are you sure delete Cell" open={isOpen} onOk={handleSubmit} onCancel={handleClose}
                okButtonProps={{ style: { backgroundColor: 'red' }}}
                >
            </Modal>
        </div>
    )
}
