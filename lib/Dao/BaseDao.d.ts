export declare class BaseDao {
    private collection;
    constructor(collection: string);
    createuserDao(payload: any): Promise<any>;
    updateUserDao(query: any, payload: any): Promise<any>;
    getUserDao(userName: any): Promise<any>;
    createGameDao(payload: any): Promise<any>;
    getGameDataDao(payload: any): Promise<any>;
    getAllGameDataDao(payload: any): Promise<any>;
    updateUserGameScoreDao(query: any, payload: any): Promise<any>;
    updateHigestScoreDao(query: any, payload: any): Promise<any>;
    getQuestionDao(payload: any): Promise<any>;
}
