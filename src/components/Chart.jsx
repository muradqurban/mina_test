import { Button } from "antd";
import { useState } from "react";
import { useFilteredData, useTableData } from "../utils";
import { firstChart, secondChart } from "../utils/chart";
import {Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js"
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip,Legend, CategoryScale, LinearScale, BarElement, Title)

export default function Chart() {
    const a = useFilteredData()
    const b = useTableData()
    const data = a.length ? JSON.parse(JSON.stringify(a)) : JSON.parse(JSON.stringify(b))

    const [analiz1, setAnaliz1 ] = useState(false) 
    const [analiz2, setAnaliz2 ] = useState(false) 
    const useData1 = firstChart(data)
    const useData2 = secondChart(data)

    const pieData = {
        labels: useData1.map(a=>a.status),
        datasets: [
            {                
            label: "data",
            data: useData1.map(a=>a.sum),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
               hoverOffset: 4
            }
        ]
    }
    const barData = {
        labels: useData2.map(a=>a.status),
        datasets: [
            {                
            label: "len",
            data: useData2.map(a=>a.sum),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
               hoverOffset: 4
            }
        ]
    }

    const chartSyle = "w-1/2 h-fit bg-indigo-100"
    const pie = () => {
        return(
            <div className={chartSyle}>
                <Pie data={pieData}/>
            </div>
        )
    }

    const bar = () => {
        return(
            <div className={chartSyle}>
                <Bar data={barData}/>
            </div>
        )
    }

    const button1 = () => analiz1 ? setAnaliz1(false) : setAnaliz1(true)
    const button2 = () => analiz2 ? setAnaliz2(false) : setAnaliz2(true)

    return(
        <>
        <div>
            <Button onClick={button1}>{analiz1 ? "close-1" :  "Analiz 1"}</Button>
            <Button onClick={button2}>{analiz2 ? "close-2" :  "Analiz 2"}</Button>
        </div>
        <div className="min-w-[1100px] max-w-screen mx-auto flex items-top justify-center gap-4">
        {analiz1 && pie()}
        {analiz2 && bar()}
        </div>
        </>
    )
}