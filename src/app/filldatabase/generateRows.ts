"use server"
import prisma from "../prisma"
/*
a - Ane And - 1a
b - Bjørn Bille - 2b
c - Carl Chick - 3c
d - Dolly Duck - 4d
e - Einar Ekorn - 5e
f - Frode Flaggermus - 6f
*/

export  async function createUsers() {

    const check = await prisma.user.findMany();
    if (check.length>=6) {return;}
    if (check.length>0 && check.length <6) {await prisma.call.deleteMany();await prisma.user.deleteMany();}

    await prisma.user.create({data:{
        username:"a",
        firstname: "Ane",
        lastname: "And",
        rfid: "1a"
    }});
    await prisma.user.create({data:{
        username:"b",
        firstname: "Bjørn",
        lastname: "Bille",
        rfid: "2b"
    }});
    await prisma.user.create({data: {
        username:"c",
        firstname: "Carl",
        lastname: "Chick",
        rfid: "3c",
    }})
    await prisma.user.create({data: {
        username:"d",
        firstname: "Dolly",
        lastname: "Duck",
        rfid: "4d",
    }})
    await prisma.user.create({data: {
        username:"e",
        firstname: "Einar",
        lastname: "Ekorn",
        rfid: "5e",
    }})
    await prisma.user.create({data: {
        username:"f",
        firstname: "Frode",
        lastname: "Flaggermus",
        rfid: "6f",
    }})

}

export async function createCalls() {
    await prisma.call.create({data:{
        rfid:"1a",
        distance:300,
    }})
    await prisma.call.create({data:{
        rfid:"2b",
        distance:150,
    }})
    await prisma.call.create({data:{
        rfid:"3c",
        distance:100,
    }})
    await prisma.call.create({data:{
        rfid:"4d",
        distance:500,
    }})
    await prisma.call.create({data:{
        rfid:"5e",
        distance:250,
    }})
    await prisma.call.create({data:{
        rfid:"6f",
        distance:50,
    }})
}