import Addfile from "./components/Addfile";
import AddNew from "./components/Addnew";
import Chart from "./components/Chart";
import MapComponent from "./components/Map";
import Table from "./components/Table";
import ModalComponent from "./modals";
import { useModal,useSelectedData } from "./utils";


export default function App() {
  const modals = useModal()
  const coordinate = useSelectedData()
  return (
    <div className="gap-2 flex flex-col max-w-screen mx-auto">
      <div className=" flex gap-4">
      <Addfile/>
      <AddNew modalState={"create"} editData={{}}/>
      </div>
      <div className="border-dashed rounded-e-sm border-black p-4 flex flex-col-2 gap-4">
      <Table/>
      {coordinate.length > 0 && <MapComponent/>}
      </div>
      <Chart/>
      {modals.length > 0 && <ModalComponent openState={true}/>}
    </div>
  );
}