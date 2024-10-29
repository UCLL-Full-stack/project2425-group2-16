import { Purchase } from "../model/purchase";

const purchase = [
        new Purchase({
            dateOfPurchase: new Date("2023-10-05"),
            currency: "USD",
            amountPayed: 59.99
        }),
        new Purchase({
            dateOfPurchase: new Date("2023-09-15"),
            currency: "EUR",
            amountPayed: 49.99
        }),
        new Purchase({
            dateOfPurchase: new Date("2023-08-22"),
            currency: "GBP",
            amountPayed: 34.99
        }),
        new Purchase({
            dateOfPurchase: new Date("2023-07-10"),
            currency: "JPY",
            amountPayed: 3999
        }),
        new Purchase({
            dateOfPurchase: new Date("2023-06-01"),
            currency: "CAD",
            amountPayed: 69.99
        })
    ];
    
export default {
    purchase
}
