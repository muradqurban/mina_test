import { ReactTabulator } from 'react-tabulator/lib/';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/bulma/tabulator_bulma.css';

import Filter from './Filter';
import { DeleteFilled, EnvironmentFilled, EditFilled } from "@ant-design/icons";
import { reactFormatter, createModal, useTableData, deleteCell, setSelectedData } from "../utils";
import { useRef, useState } from 'react';


const GetMapData = () => {
    return <EnvironmentFilled />
}

const EditCell = () => {
return <EditFilled/>
}


const DelteCell = () => {
return  <DeleteFilled />

}

export default function Table () {
    const tabulator = useRef(null);
    const [filteredData,setFilteredData] = useState([])
    const data = useTableData()
    const tableData = filteredData.length ? filteredData : JSON.parse(JSON.stringify(data));   

    const titleData = ["id","len","wkt","status"]
      
    const manipulateCell = cell => {
        const getCell = cell.getRow();
        const cellDatas = getCell._row.data;
        return cellDatas
    } 
    const options = {
        height: 470,
        pagination:true,
        paginationSize:10,
      };

    const columns = [
        { title: titleData[0], field: "id", headerFilter:true, headerFilterPlaceholder:"Search", width: 100},
        { title: titleData[1], field: "len", headerFilter:true, headerFilterPlaceholder:"Search",width: 150},
        { title: titleData[2], field: "wkt", headerFilter:true, headerFilterPlaceholder:"Search", width:500},
        { title: titleData[3], field: "status", headerFilter:true, headerFilterPlaceholder:"Search", width: 100},
        { title: "", hozAlign: "center", width: 25, formatter:reactFormatter(<GetMapData/>), cellClick: (e,cell)=>{
            const cellDatas= manipulateCell(cell)
            setSelectedData(cellDatas.wkt)
        }},
        { title: "", hozAlign: "center", width: 25, formatter:reactFormatter(<EditCell/>), cellClick: (e,cell)=>{
            const cellDatas= manipulateCell(cell)
            createModal("edit",cellDatas)}},
        { title: "", hozAlign: "center", width: 25, formatter:reactFormatter(<DelteCell/>), cellClick: function(e,cell){
            cell.getRow().delete()
            const cellDatas= manipulateCell(cell)
            deleteCell(cellDatas)}},
      ];



      return(
        <div className="">
            <Filter
            title={titleData}
            tabulator={tabulator}
            setFilteredData={setFilteredData}
            />
           <ReactTabulator
            data={tableData}
            columns={columns}
            options={options}
            onRef={(ref) => (tabulator.current = ref)}
            />
        </div>
    )
}

