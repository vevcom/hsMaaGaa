"use server"
import prisma from "../../prisma";
import { NextRequest, NextResponse } from "next/server";
import { createCall, createUser, userDistance, userDistanceList } from "@/app/utilities/dbutils";
import { verifyRFID } from "@/app/utilities/verify";


/*Will use rfid in the API-call, and then we make an API-call to Veven to verify the identity of the user.
The connection between rfid and name is stored on Veven. */

/*
A Rest API follows approximately the format of:

METHOD (POST/GET/or similiar.)
content-type: "application/json"
authorization: API-key

body (This is just JSON-data): {
rfid: users rfid
distance: users distance
}
*/

const APIKEY = process.env.API_KEY;


export async function GET({request}:{request:NextRequest}) {
    const auth_header = request.headers.get("Authorization");

    //Wrong API-key
    if (auth_header != APIKEY) {
        return NextResponse.json({error:"Failed to authorize"},{status:401});
    }
    const body = await request.json();
    
    //Not specified user, return all user data
    const userData = await userDistanceList();
    if (!body.rfid) {
        return NextResponse.json(userData);
    }

    //Try to find the specified user
    const user = await prisma.user.findUnique({
        where:{
            rfid:body.rfid
        },
        select:{
            firstname:true,
            lastname:true,
            username:true,
            calls:true}
    });

    //Could not find user, return all user data
    if (!user) {
        return NextResponse.json({error:`Could not find user. rfid:${body.rfid}`,data:userData},{status:200});
    }

    //Found user, returning data
    return NextResponse.json({firstname:user.firstname,lastname:user.lastname,username:user.username,distance:user.calls.reduce((sum,{distance})=>sum+distance,0)});

}

export async function POST({request}:{request:NextRequest}) {
    const auth_header = request.headers.get("Authorization");

    //Wrong API-key
    if (auth_header != APIKEY) {
        return NextResponse.json({error:"Failed to authorize"},{status:401});
    }

    const body = await request.json();
    
    //Missing or invalid fields
    if (!body.rfid || typeof body.distance != "number") {
        return NextResponse.json({error:"Missing or invalid fields."},{status:400})
    }

    // Check if user exists
    const findUser = await prisma.user.findUnique({
        where:{rfid:body.rfid},
        select:{
            username:true,
        }
    });

    // User not found
    if (!findUser) {
        // Check if the user should exist (if HS member), and gather name through API-call to veven with rfid.
        const userToBeCreated = await verifyRFID(body.rfid);

        if(userToBeCreated) {
            const createdUser = await createUser(userToBeCreated.firstname,userToBeCreated.lastname,userToBeCreated.username,userToBeCreated.rfid);
            if (!createdUser) {
                return NextResponse.json({error:`Error creating user rfid:${body.rfid} . Please notify Vevcom.`},{status:500});
            }
        } else {return NextResponse.json({error:`User not found. rfid:${body.rfid}`},{status:404});}
    }

    // User found => create new call
    await createCall(body.rfid,body.distance);

    // Updated user with name and distance
    let updatedUser = await userDistance(body.rfid);

    // This should not trigger
    if (!updatedUser){return NextResponse.json({error:"User not found"},{status:404});}

    // Return updated user and distance
    return NextResponse.json({message:"Successfull post",data:{firstname:updatedUser.firstname,lastname:updatedUser.lastname,username:updatedUser.username,distance:updatedUser.distance}},{status:201});
}