import { BaseDao } from '../Dao/BaseDao';
export declare class GameService extends BaseDao {
    constructor();
    private static instance;
    static getInstance(): GameService;
    creategame(payload: any): Promise<any>;
    getGameData(payload: any): Promise<any>;
    updateUserGameScore(payload: any): Promise<any>;
    getQuestion(payload: any): Promise<any>;
}
