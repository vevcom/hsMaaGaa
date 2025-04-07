"use server"
import { createCalls } from "@/app/filldatabase/generateRows";
import prisma from "../../prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { env } from "process";
import { Sumana } from "next/font/google";
import { distanceBetweenPoints } from "chart.js/helpers";
import { userDistanceList } from "@/app/dbutils/dbutils";


/*Unsure whether to use rfid/username/name in the API-call.
Have to decide whether we or OV will store the connection between RFID and the users name/username.
It might be better that we do it, since we have a database. Maybe in connection with Omega Kioleskabet. */

/*
A Rest API follows approximately the format of:

METHOD (POST/GET/or similiar.)
content-type: "application/json"
authorization: API-key

body (This is just JSON-data): {
user: users username or rfid, not decided yet
distance: users distance
}
*/

const APIKEY = process.env.API_KEY;



// const userData = [{name:"aneand",distance:321},{name:"bjarbj",distance:432},{name:"carlch",distance:543}];

export async function GET({request}:{request:NextRequest}) {
    const auth_header = request.headers.get("Authorization");

    //Wrong API-key
    if (auth_header != APIKEY) {
        return NextResponse.json({error:"Failed to authorize"},{status:401});
    }
    const body = await request.json();
    
    //Not specified user, return all user data
    const userData = await userDistanceList();
    if (!body.user) {
        return NextResponse.json(userData);
    }

    //Try to find the specified user
    const user = await prisma.user.findUnique({
        where:{
            username:body.user
        },
        select:{calls:true}
    });

    //Could not find user, return all user data
    if (!user) {
        return NextResponse.json({error:"Could not find user",data:userData},{status:200});
    }

    //Found user, returning data
    return NextResponse.json({name:body.user,distance:user.calls.reduce((sum,{distance})=>sum+distance,0)});

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

    // Check if user exists
    const checkForUser = await prisma.user.findUnique({
        where:{username:body.user},
        select:{
            name:true,
        }
    });

    // User not found
    if (!checkForUser) {
        return NextResponse.json({error:"User not found"},{status:404});
    }

    // User found => create new call
    await prisma.call.create({
        data: {
            distance:body.distance,
            user:{connect:{username:body.user}}
        }
    });

    // Load the updated user with call list
    const specifiedUser = await prisma.user.findUnique({
        where:{username:body.user},
        select:{
            calls:true,
            name:true,
        },
    });
    // Only necessary because of VScode
    if (!specifiedUser){return NextResponse.json({error:"User not found"},{status:404});}

    let totalDistance = specifiedUser.calls.reduce((sum,{distance})=>sum+distance,0);

    // Return updated user and distance
    return NextResponse.json({message:"Successfull post",data:{name:specifiedUser.name,distance:totalDistance}},{status:201});
}