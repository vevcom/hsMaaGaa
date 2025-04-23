"use client"

// REMEMBER: npm install --save chart.js react-chartjs-2
import { Bar } from "react-chartjs-2";
import { DataType, getRunningData } from "../graphs/loadData";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import style from "./stretchgoals.module.scss"
import { useEffect, useState } from "react";
import next from "next";


// This is an entire Marathon, just for HS

const distanceDestination:{distance:number;destination:string;}[] = [
    {distance:0, destination:"på mølla"},
    {distance:100, destination:"opp fra OV"},
    {distance:400 , destination:"Rundt frimerket"},
    {distance: 1100, destination:"til Samfundet"},
    {distance: 2700, destination:"til Downtown"},
    {distance: 4100, destination:"til Festningen"},
    {distance: 5400, destination:"til Tyholttårnet"},
    {distance: 8300, destination:"til IKEA Leangen"},
    {distance: 11300, destination:"til Dragvoll"},
    {distance: 13600, destination:"til Dominos Moholt"},
    {distance: 16700, destination:"til Grip klatring på Sluppen"},
    {distance: 21100, destination:"til Theisendammen"},
    {distance: 26400, destination:"til Studenterhytta"},
    {distance: 34600, destination:"til Kalvskinnet"},
    {distance: 35200, destination:"til Nidarosdomen"},
    {distance: 35700, destination:"til Gamle Bybro"},
    {distance: 36800, destination:"til Solsiden"},
    {distance: 37500, destination:"til Møllenberg"},
    {distance: 40200, destination:"til Lerkendal stadion"},
    {distance: 41800, destination:"til Samfundet igjen"},
    {distance: 42300, destination:"til Hovedbygningen"},
];


export default function Stretchgoals({totalDistance}:{totalDistance:number}) {
    const [nextIndex,setNextIndex] = useState(1);
    const [progressBar,setProgressBar] = useState(0);

    useEffect(()=>{
        let foundIndex = 0;
        for (let i = 0; i < distanceDestination.length; i++ ){
            
            console.log("for: ",i);

            if (totalDistance <distanceDestination[i].distance){
                foundIndex=i;
                console.log("found: ",foundIndex);

                break;
            }
        }
        console.log("found: ",foundIndex);
        setNextIndex(foundIndex);
        console.log(nextIndex);
        console.log(totalDistance);
        console.log(distanceDestination[foundIndex-1].distance)
        console.log((totalDistance-distanceDestination[foundIndex-1].distance),"/",(distanceDestination[foundIndex].distance-distanceDestination[foundIndex-1].distance));
        console.log("=",(totalDistance-distanceDestination[foundIndex-1].distance)/(distanceDestination[foundIndex].distance-distanceDestination[foundIndex-1].distance))
        setProgressBar((totalDistance-distanceDestination[foundIndex-1].distance)/(distanceDestination[foundIndex].distance-distanceDestination[foundIndex-1].distance))
        console.log("index: ",nextIndex);
    },[totalDistance])


    return <div>
        <p>De er nå på vei {distanceDestination[nextIndex].destination} ({distanceDestination[nextIndex].distance} meter)</p>
        <div className={style.progressBarContainer} >
            <div style={{width:`${progressBar*100}%`}} className={style.progressBar}><div className={style.progressText}>{Math.round(progressBar*100)}%</div></div>
        </div>
        <p><br></br>For å gjøre det har de gått:</p>
        <ul className={style.list}>
            {distanceDestination.slice(0,nextIndex).map((item,index)=>(<li className={style.listitem} key={index}>{item.destination} - {item.distance}m</li>))}

        </ul>

    </div>
}