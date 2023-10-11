import { useState } from "react";
import { Radio, Input, Button } from "antd"
import { clearFilteredData, createFilteredData } from "../utils";

export default function Filter({title,tabulator,setFilteredData}) {
    const inputStyle = "w-[250px]";
    const operations = [">",">=","<","<=","=","!="];

    const [filterState,setFilterState] = useState({})
    const [showButton,setShowButton] = useState(true)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFilterState({ ...filterState, [name]:value })
    }

    const handleSearch = (e) => {
        setShowButton(false)
        const table = tabulator.current.current;
        const filters = [
            { field: filterState.field, type: filterState.type, value: filterState.value },
          ];
        table.setFilter(filters);
        const filterData = table.getData("active")
        setFilteredData(filterData)
        const sendData = JSON.parse(JSON.stringify(filterData))
        createFilteredData(sendData)  
    }

    const handleClose = () => {
        setShowButton(true)
        const table = tabulator.current.current;
        table.clearFilter()
        setFilteredData([])
        setFilterState({});
        clearFilteredData()        
    }

    return(
        <div className="w-full h-[50px] bg-indigo-100 rounded flex items-center justify-evenly gap-4">
            <Radio.Group name="field" value={filterState.field} onChange={handleChange}>
              {title && title.map((a,index)=> <Radio.Button key={index} value={a}>{a}</Radio.Button>)}
            </Radio.Group>

            <Radio.Group name="type" value={filterState.type} onChange={handleChange}>
              {operations && operations.map((a,index)=> <Radio.Button key={index} value={a}>{a}</Radio.Button>)}
            </Radio.Group>

            <Input
                className={inputStyle}
                name="value"
                value={filterState.value}
                onChange={handleChange}
                placeholder="filter..."
             />
             {showButton && 
                <Button
                type="primary"
                disabled={!filterState.field || !filterState.type || !filterState.value}
                onClick={handleSearch}
                >Search
            </Button> }
            <Button
                type="primary"
                danger
                onClick={handleClose}
                >Clear
            </Button>
        </div>
    )
}

