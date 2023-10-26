 import { useModal } from '../utils';
 import CreateModal from './create';
 import EditModal from './edit';
 import DeleteModal from './delete';



export default function ModalComponent () {
    const modals = useModal()

    const RenderModal = () => {
        switch(modals[0].name){
            case "create":
                return <CreateModal openState={true}/>
            case "edit":
                return <EditModal openState={true}/>
            case "delete":
                return <DeleteModal openState={true}/>
            default:
                return "modal"
        }
    }


    return (
        <div>{RenderModal()}</div>
    )
}
