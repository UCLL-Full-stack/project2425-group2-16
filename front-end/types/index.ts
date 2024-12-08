export type User = {
  id: string;
  username: string;
  phoneNumber: number;
  emailAddress: string;
  birthDate: Date;
  password: string;
  accountCreationDate: Date;
  timeZone: string;
  country: string;
  age: number;
};

export type Login = {
  emailAddress: string;
  password: string;
}


export type FavoritesList = { 
    privacySettings: string;
    listCreationDate: Date;
    description: string;
    listName: string;
};

export type Game = {
  id: string; 
  genre: string;
  rating: number;
  supportedLanguages: string;
  title: string;
  price: number;
  systemRequirements: string;
  releaseDate: Date;
  multiplayer: boolean;
};


export type Publisher = { 
  contactInformation: string;
  overallRating: number;
  dateOfFirstPublishing: Date;
  name: string;
  country: string;
  website: string;
};

export type Purchase = { 
  dateOfPurchase: Date;
  currency: 'USD' | 'EUR' | 'GBP' | 'ROBUX' | 'GEL' | 'LRA' | string;
  amountPayed: number;
};

export type PurchasedGames = { 
  totalValue: number;
};