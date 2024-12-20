export type User = {
  id: number;
  username: string;
  phoneNumber: number;
  emailAddress: string;
  birthDate: Date;
  password: string;
  accountCreationDate: Date;
  timeZone: string;
  country: string;
  age: number;
  purchasedGames: Game[];
  publisherId: number;
  role: string;
};

export type Login = {
  emailAddress: string;
  password: string;
  // role: string;
  // role: 'moderator' | 'standardUser';
}

export type FavoritesList = {
  length: number;
  some(arg0: (favoritedGame: any) => boolean): unknown;
  id?: number;
  privacySettings: boolean;
  description: string;
  listName?: string; // Optional, since it's not in the backend class
  listCreationDate?: Date; // Optional, since it's not in the backend class
  games: Array<Game>; // Add this to match backend
  owner: User; // Add this to match backend
};

export type Game = {
  id: number; 
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
  currency: 'USD' | 'EUR' | 'GBP' | 'ROBUX' | string;
  amountPayed: number;
};

export type PurchasedGames = { 
  totalValue: number;
};