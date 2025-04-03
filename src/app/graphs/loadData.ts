import { Call } from "@prisma/client"
import prisma from "../prisma"
import {Prisma} from "@prisma/client"

type Data = {
    name:String
    distance:Number
}

type UserWithCalls = Prisma.UserGetPayload<{
    include: {calls: true}
}>

export default async function Graph() {


    const users = await prisma.user.findMany({
        select: {
            calls: true,
            name: true,
        }
    })

    let data:Data[]=[];


    let distance:number = 0;
    let calls:Call[];


    for (var i = 0; i<users.length;i++) {
        distance = 0;
        calls = users[i].calls;
        for (var j = 0; j<calls.length;j++) {
            distance += calls[j].distance;
        }

        data.push({name:users[i].name,distance:distance});
    }

    return data;
}

