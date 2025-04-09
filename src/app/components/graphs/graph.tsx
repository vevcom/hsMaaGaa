"use server"

// REMEMBER: npm install --save chart.js react-chartjs-2
import { Bar } from "react-chartjs-2";
import { DataType } from "./loadData";




export default function BarGraph({Data}:{Data:DataType}) {


    return <Bar data={Data}></Bar>
}


