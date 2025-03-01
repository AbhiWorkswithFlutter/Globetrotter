import { BaseDao } from '../Dao/BaseDao';
import {Router, Request, Response} from 'express';


export class GameService extends BaseDao{

    constructor() {
        super("Games")
    }

    private static instance: GameService;

    public static getInstance() {
        if(GameService.instance == null){
            GameService.instance = new GameService()
        }
        return GameService.instance
    }


    public async creategame(payload:any) {

        let user = await this.createGameDao(payload);
        return user
        
    }

    public async getGameData(payload:any) {
        let data = await this.getGameDataDao(payload);
        return data
        
    }

    public async updateUserGameScore(payload:any) {
        let query = {"gameid": payload.gameid}
        let data = await this.updateUserGameScoreDao(query, payload);
        return data
        
    }

    


    public async getQuestion(payload:any) {
        console.log(payload.alias)
        let data = await this.getQuestionDao(payload);
        return data
        
    }
}