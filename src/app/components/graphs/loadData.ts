import prisma from "../../prisma"
import { Sumana } from "next/font/google"


export type DataType = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        // backgroundColor: string[];
    }[];
}

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
            // backgroundColor: [],
        }]
    };

    return {data,totalDistance};
}

