


// Optimally, we would have our own API that simply returns a users name,username and whether they are 
// a member of HS or not. As of now, we have to cross-check with a given list of names.

// Still need to add API key to veven.

const HSlist:{username:string,firstname:string,lastname:string}[] = [
    {username:"espenjb",firstname:"Espen",lastname:"Johnsen Bentdal"},
    {username:"livske",firstname:"Liv",lastname:"Skeie"},
    {username:"sondraar",firstname:"Sondre",lastname:"Aarli"},
    {username:"matildew",firstname:"Matilde",lastname:"Welle-Gleditsch"},
    {username:"kaherrev",firstname:"Kristian Albert Fuglestad",lastname:"Herrevold"},
    {username:"noahm",firstname:"Noah",lastname:"Mikkelsen"}
];

export async function verifyRFID({rfid}:{rfid:string}) {
    // Code for API "koket" from omegafridge
    /*
    API call returns dictionary with data of user

    Example:
    {
        "hasStripePaymentMethod": "True",
        "hasStripeCustomer": "True",
        "id": 0,
        "stripeCustomerId": "**********",
        "stripePaymentMethodId": "None",
        "stripeCardDescription": "None",
        "NTNUCard": "RFID",
        "disabled": "False",
        "createdAt": "YYYY-MM-DDTHH:MM:SS.DDDZ",
        "updatedAt": "YYYY-MM-DDTHH:MM:SS.DDDZ",
        "UserId": 0,
        "User": {
            "firstname": "firstname",
            "lastname": "lastname",
            "id": 0,
            "username": "username",
            "order": 0
        },
        "balance": 0
    }
    */
    const url = `${process.env.VEV_PROTOCOL}://${process.env.VEV_HOSTNAME}/api/money/fridge/${rfid}?pass=${process.env.API_KEY_VEV}`;
    const userData = await (await fetch(url)).json();
    for (let i = 0; i<HSlist.length;i++) {
        if (HSlist[i].username==userData.User.username){
            return {firstname:userData.User.firstname,lastname:userData.User.lastname,username:userData.username,rfid:rfid};
        }
    }
    return null;


}