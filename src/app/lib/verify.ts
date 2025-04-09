


// Optimally, we would have our own API that simply returns a users name,username and whether they are 
// a member of HS or not. As of now, we have to cross-check with a given list of names.

// Still need to add API key to veven.

const HSlist:{username:string,firstName:string,lastName:string}[] = [
    {username:"espenjb",firstName:"Espen",lastName:"Johnsen Bentdal"},
    {username:"livske",firstName:"Liv",lastName:"Skeie"},
    {username:"sondraar",firstName:"Sondre",lastName:"Aarli"},
    {username:"matildew",firstName:"Matilde",lastName:"Welle-Gleditsch"},
    {username:"kaherrev",firstName:"Kristian Albert Fuglestad",lastName:"Herrevold"},
    {username:"noahm",firstName:"Noah",lastName:"Mikkelsen"}
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
            return {firstName:userData.User.firstName,lastName:userData.User.lastName,username:userData.username,rfid:rfid};
        }
    }
    return null;


}