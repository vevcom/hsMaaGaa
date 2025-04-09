import prisma from "../prisma";




export async function userDistanceList() {
    /*Returns a list of all users and their corresponding total distance. 
    List of objects, of type {firstName: (users first name), lastName: (last name), distance: (users total distance)} */

    const userList = await prisma.user.findMany({
        select:{
            username:true,
            firstName:true,
            lastName:true,
            calls:true,
        }
    });

    const userMap = userList.map(user => ({firstName:user.firstName,lastName:user.lastName,distance:user.calls.reduce((sum,{distance})=>sum+distance,0)}));

    return userMap;
}

export async function userDistance(rfid:string){
    /* Returns specified users first-, last-, and user-name and distance*/

    const specifiedUser = await prisma.user.findUnique({
        where:{rfid:rfid},
        select:{
            calls:true,
            username:true,
            firstName:true,
            lastName:true,
        },
    });

    // Only necessary because of VScode
    if (!specifiedUser){return null;}

    let totalDistance = specifiedUser.calls.reduce((sum,{distance})=>sum+distance,0);

    return {firstName:specifiedUser.firstName,lastName:specifiedUser.lastName,username:specifiedUser.username,distance:totalDistance};
}

export async function createUser(firstName:string,lastName:string,username:string,rfid:string) {
    /*Creates a user with the given info. */
    await prisma.user.create({
        data:{
            rfid:rfid,
            username:username,
            firstName:firstName,
            lastName:lastName,
        }
    });
    const user = await prisma.user.findUnique({
        where:{rfid:rfid}
    });

    return user;
}

export async function createCall(rfid:string,distance:number){
    /*Creates a call with the given parameters. */
    await prisma.call.create({
        data: {
            distance:distance,
            user:{connect:{rfid:rfid}}
        }
    });
}