import prisma from "../prisma";




export async function userDistanceList() {
    /*Returns a list of all users and their corresponding total distance. 
    List of objects, of type {name: (users name), distance: (users total distance)} */

    const userList = await prisma.user.findMany({
        select:{
            username:true,
            name:true,
            calls:true,
        }
    });

    const userMap = userList.map(user => ({name:user.name,distance:user.calls.reduce((sum,{distance})=>sum+distance,0)}));

    return userMap;
}