import { MongoConfig } from "../Config/Mongoconfig";
import {Router, Request, Response} from 'express';
import { BaseDao } from "../Dao/BaseDao";

export class UserService extends BaseDao {

    constructor() {
        super("Players")
    }

    private static instance: UserService;

    public static getInstance() {
        if(UserService.instance == null){
            UserService.instance = new UserService()
        }
        return UserService.instance
    }

    

    public async createUser(payload:any) {
        let user = await this.createuserDao(payload);
        return user
        
       
    }

    public async updateUser(payload:any) {
        let query = {"userName": payload.userName}
        let user = await this.updateUserDao(query, payload);
        return user


    }

    public async updateHigestScore(payload:any) {
        let query = {"userName": payload.userName}
        let data = await this.updateHigestScoreDao(query, payload);
        return data
        
    }

    public async getUser(userName:any) {
        let user = await this.getUserDao(userName);
        return user

    }

}