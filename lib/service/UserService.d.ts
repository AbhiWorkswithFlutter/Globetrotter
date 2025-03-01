import { BaseDao } from "../Dao/BaseDao";
export declare class UserService extends BaseDao {
    constructor();
    private static instance;
    static getInstance(): UserService;
    createUser(payload: any): Promise<any>;
    updateUser(payload: any): Promise<any>;
    updateHigestScore(payload: any): Promise<any>;
    getUser(userName: any): Promise<any>;
}
