import { useRef } from "react"
import * as XLSX from "xlsx"
import { uploadFile } from "../utils"


export default function Addfile () {
    const hiddenFileInput = useRef(null)
    const handleClick = (e) => {
        hiddenFileInput.current.click()
    }
    const handleChange = (e) => {
        const reader = new FileReader()
        reader.readAsBinaryString(e.target.files[0])
        reader.onload = (e) => {
            const data = e.target.result
            const workbook = XLSX.read(data, { type: 'binary' })
            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName]
            const parsedData = XLSX.utils.sheet_to_json(sheet)
            uploadFile(parsedData)
        }
    }


    return(
        <>
             <button
             className="bg-green-600 hover:bg-green-400 cursor-pointer p-2 border-0 rounded-md font-bold"
             onClick={handleClick}
             >
             Load Excel File
             </button>
            <input
            className="hidden"
            type="file"
            accept=".xls, .xlsx"
            onChange={handleChange}
            ref={hiddenFileInput}
            />
        </>
    )
}