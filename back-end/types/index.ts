type UserInput = {
    phoneNumber: number;
    emailAddress: string;
    birthDate: Date;
    password: string;
    accountCreationDate: Date;
    timeZone: string;
    country: string;
    age: number;

}


type GameInput = {
    genre: string;
    rating: number;
    supportedLanguages: string;
    title: string;
    price: number;
    systemRequirements: string;
    releaseDate: Date;
    multiplayer: boolean;
}


type PublisherInput = {
    contactInformation: string;
    overallRating: number;
    dateOfFirstPublishing: Date;
    name: string;
    country: string;
    website: string;
}


type PurchaseInput = {
    dateOfPurchase: Date;
    currency: string;
    amountPayed: number;
}


type PurchasedGamesInput = {
    totalValue: number;
}


export {
    UserInput,
    GameInput,
    PublisherInput,
    PurchaseInput,
    PurchasedGamesInput
}