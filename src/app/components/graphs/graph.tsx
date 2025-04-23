"use client"

// REMEMBER: npm install --save chart.js react-chartjs-2
import { Bar } from "react-chartjs-2";
import { DataType, getRunningData } from "./loadData";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import style from "./graph.module.scss"

// Register only the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
);




export default function BarGraph({Data}:{Data:DataType}) {
// export default async function BarGraph() {
    // const {data,totalDistance} = await getRunningData();


    return <div className={style.graphBackground}>
        <div className={style.graphTitle}>Hvor langt har HS' medlemmer EGENTLIG gått?</div>
        <Bar data={Data}></Bar>
        </div>
}


