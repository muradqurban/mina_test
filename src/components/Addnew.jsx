import { createModal } from "../utils";

export default function AddNew () {
    return (
        <button
        onClick={()=>createModal("create")}
        className="bg-green-600 hover:bg-green-400 cursor-pointer p-2 border-0 rounded-md font-bold"
        >
            Add New Data
        </button>
    )
}
