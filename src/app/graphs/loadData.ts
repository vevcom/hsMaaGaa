import prisma from "../prisma"
import {Prisma} from "@prisma/client"
import { Sumana } from "next/font/google"

type UserWithCalls = Prisma.UserGetPayload<{
    include: {calls: true}
}>

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
            name: true,
        }
    })

    let userDistances:number[] = users.map(u=> u.calls.reduce((sum,{distance}) => distance+sum,0));
    let totalDistance:number = userDistances.reduce((sum,item) => sum + item,0);
    
    const data = {
        labels: users.map(u => u.name),
        datasets: [{
            label: "Hvor langt har HS-medlemmene gått",
            data: userDistances,
            // backgroundColor: [],
        }]
    };

    return {data,totalDistance};
}

