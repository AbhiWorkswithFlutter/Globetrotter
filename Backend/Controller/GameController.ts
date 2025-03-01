import {Request, Response} from 'express';
import { GameService } from '../service/GameService';


export class GameController{


    


    public async createGameController(req:Request, res:Response){

        let ob = GameService.getInstance();
        ob.creategame(req.body).then(game => {
            res.send(game);
        })

    }

    public async getGameDataController(req:Request, res:Response) {
        let ob = GameService.getInstance();
        ob.getGameData(req.body).then(data => {
            res.send(data);
        })
        
    }

    public async updateUserGameScoreController(req:Request, res:Response) {
        let ob = GameService.getInstance();
        ob.updateUserGameScore(req.body).then(data => {
            res.send(data);
        })
        
    }

    

    public async getQuestionController(req:Request, res:Response) {
        let ob = GameService.getInstance();
        let alias = "dst" + (Math.floor(Math.random() * 150) + 1);
        console.log(alias)
        ob.getQuestion({'alias':alias}).then(ques => {
            res.send(ques);
        })
        
    }





    

    
}