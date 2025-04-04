"use server"
import prisma from "../prisma"
/*
a - Ane And - 1a
b - Bjørn Bille - 2b
c - Carl Chick - 3c
d - Dolly Duck - 4d
*/

export  async function createUsers() {

    const check = await prisma.user.findMany();
    if (check.length!=0) {return;}

    await prisma.user.create({data:{
        username:"a",
        name: "Ane And",
        rfid: "1a"
    }});
    await prisma.user.create({data:{
        username:"b",
        name: "Bjørn Bille",
        rfid: "2b"
    }});
    await prisma.user.create({data: {
        username:"c",
        name: "Carl Chick",
        rfid: "3c",
    }})

}

export async function createCalls() {
    await prisma.call.create({data:{
        username:"a",
        distance:300,
    }})
    await prisma.call.create({data:{
        username:"b",
        distance:150,
    }})
    await prisma.call.create({data:{
        username:"c",
        distance:100,
    }})
}