import prisma from "../../prisma"
import { Sumana } from "next/font/google"


export type DataType = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
    }[];
}

const colors = [               //definert farger 
    'rgb(240, 8, 58)',     //farge nummer 1 tilhører nå 1.klasse feks
    "rgb(255,125,0)",
    'rgb(252, 235, 5)',
    'rgb(6, 202, 16)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)'
  ];

export async function getRunningData() {

    const users = await prisma.user.findMany({
        select: {
            calls: true,
            firstname: true,
        }
    })

    let userDistances:number[] = users.map(u=> u.calls.reduce((sum,{distance}) => distance+sum,0));
    let totalDistance:number = userDistances.reduce((sum,item) => sum + item,0);
    
    const data = {
        labels: users.map(u => u.firstname),
        datasets: [{
            label: "Hvor langt har HS-medlemmene gått",
            data: userDistances,
            backgroundColor: colors,
        }]
    };

    return {data,totalDistance};
}

