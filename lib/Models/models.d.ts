export interface Player {
    username: string;
    profileicon: any;
    higestscore: number;
    games: any;
    friends: any;
}
export interface Game {
    gameid: string;
    playerid: string;
    score: number;
    right: number;
    wrong: number;
}
