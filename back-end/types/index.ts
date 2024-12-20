import { UserRole } from "@prisma/client";

type UserInput = {
    username: string;
    phoneNumber: number;
    emailAddress: string;
    birthDate: Date;
    password: string;
    accountCreationDate: Date;
    timeZone: string;
    country: string;
    age: number;
    role: UserRole;
}

type authenticateInput = { 
    emailAddress: string;
    password: string;
    role: UserRole;
}

type ListInput = {
    username: string;
    gameId: number;
}

type Login = {
    username: string;
    password: string;
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

type AuthenticationResponse = {
    token: string;
    username: string;
    role: UserRole;
};




export {
    UserInput,
    Login,
    GameInput,
    PublisherInput,
    PurchaseInput,
    PurchasedGamesInput,
    AuthenticationResponse,
    ListInput,
    authenticateInput
}