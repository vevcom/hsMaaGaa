"use server"
import prisma from "../../prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { env } from "process";

/*
A Rest API follows approximately the format of:

METHOD (POST/GET/or similiar.)
content-type: "application/json"
authorization: API-key

body (This is just JSON-data): {
username: users username
distance: users distance
}
*/

const APIKEY = process.env.API_KEY;



const userData = [{name:"aneand",distance:321},{name:"bjarbj",distance:432},{name:"carlch",distance:543}];

export async function GET({request}:{request:NextRequest}) {
    const auth_header = request.headers.get("Authorization");

    //Wrong API-key
    if (auth_header != APIKEY) {
        return NextResponse.json({error:"Failed to authorize"},{status:401});
    }
    const body = await request.json();
    
    //Not specified user, return all users
    if (!body.name) {
        return NextResponse.json(userData);
    }

    //Else, try to find specified user
    const user = await prisma.user.findUnique({
        where:{
            username:body.user
        },
        select:{calls:true}
    });

    //Could not find user
    if (!user) {
        return NextResponse.json({error:"Could not find user"},{status:400});
    }

    //Found user, returning data
    return NextResponse.json({name:body.user,distance:user.calls.reduce((sum,{distance})=>sum+distance,0)});


    




    return NextResponse.json({data:userData});
}

export async function POST({request}:{request:NextRequest}) {
    const auth_header = request.headers.get("Authorization");

    //Wrong API-key
    if (auth_header != APIKEY) {
        return NextResponse.json({error:"Failed to authorize"},{status:401});
    }

    const body = await request.json();
    
    //Missing or invalid fields
    if (!body.user || typeof body.distance != "number") {
        return NextResponse.json({error:"Missing or invalid fields."},{status:400})
    }

    const checkUser = await prisma.user.findUnique({
        where:{username:body.user},
        select:{calls:true}
    });

    // User not found
    if (!checkUser) {
        return NextResponse.json({error:"User not found"},{status:400});
    }

    await prisma.call.create({
        data: {
            distance:body.distance,
            user:{connect:{username:body.user}}
        }
    });

    let totalDistance = checkUser.calls.reduce((sum,{distance})=>sum+distance,0);
    totalDistance += body.distance;

    return NextResponse.json({message:"Successfull post",data:{name:body.name,distance:totalDistance}},{status:201});
}