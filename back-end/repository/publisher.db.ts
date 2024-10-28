import { Publisher } from "../model/publisher";

const publishers = 
    [
        new Publisher({
            contactInformation: "contact@gamepublisher1.com",
            overallRating: 4.5,
            dateOfFirstPublishing: new Date("1995-03-15"),
            name: "Game Publisher One",
            country: "USA",
            website: "www.gamepublisher1.com"
        }),
        new Publisher({
            contactInformation: "info@gamepublisher2.com",
            overallRating: 4.8,
            dateOfFirstPublishing: new Date("2000-06-20"),
            name: "Game Publisher Two",
            country: "UK",
            website: "www.gamepublisher2.com"
        }),
        new Publisher({
            contactInformation: "support@gamepublisher3.com",
            overallRating: 4.2,
            dateOfFirstPublishing: new Date("2010-09-10"),
            name: "Game Publisher Three",
            country: "Germany",
            website: "www.gamepublisher3.com"
        }),
        new Publisher({
            contactInformation: "hello@gamepublisher4.com",
            overallRating: 4.7,
            dateOfFirstPublishing: new Date("2015-01-05"),
            name: "Game Publisher Four",
            country: "Canada",
            website: "www.gamepublisher4.com"
        }),
        new Publisher({
            contactInformation: "contact@gamepublisher5.com",
            overallRating: 4.9,
            dateOfFirstPublishing: new Date("2018-08-30"),
            name: "Game Publisher Five",
            country: "Australia",
            website: "www.gamepublisher5.com"
        })
    ]
