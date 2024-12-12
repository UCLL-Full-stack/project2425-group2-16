import userDb from "../repository/user.db";
import { Game } from "./game";
import { User } from "./user";

export class FavoritesList {
    id?: number;
    privacySettings: boolean;
    description: string;
    owner: User;
    games: Array<Game>;

    // Constructor
    constructor(params: { 
        id?: number; 
        privacySettings: boolean; 
        description: string; 
        owner: User; 
        games: Array<Game>
    }) {
        this.id = params.id;
        this.privacySettings = params.privacySettings;
        this.description = params.description;
        this.owner = params.owner;
        this.games = params.games || []; // Ensure games is initialized as an array
    }

    // Getters and Setters
    public getId(): number | undefined {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getPrivacySettings(): boolean {
        return this.privacySettings;
    }

    public setPrivacySettings(privacySettings: boolean): void {
        this.privacySettings = privacySettings;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getOwner(): User {
        return this.owner;
    }

    public setOwner(owner: User): void {
        this.owner = owner;
    }

    public getGames(): Array<Game> {
        return this.games;
    }

    public setGames(games: Array<Game>): void {
        this.games = games;
    }

    public addGame(game: Game): void {
        if (!Array.isArray(this.games)) {
            this.games = []; // Reinitialize games as an array if it's not already
        }
        this.games.push(game); // Use push method to add the game
    }

    public removeGame(gameId: number): void {
        this.games = this.games.filter(game => game.id !== gameId);
    }

    // Static method to create a FavoritesList from raw data
    static async fromObjectAsync(obj: any): Promise<FavoritesList> {
        const list = new FavoritesList({
            id: obj.id,
            privacySettings: obj.privacySettings,
            description: obj.description,
            owner: obj.Owner,
            games: obj.games || [] // Ensure games is initialized as an array
        });

        // Fetch the owner (user) from the database
        const owner = await userDb.findById(obj.userId); // Assumes userDb is imported and accessible
        if (owner) {
            list.setOwner(owner);
        }

        return list;
    }
}