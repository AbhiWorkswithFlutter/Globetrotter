import {Router, Request, Response} from 'express';
import { GameService } from '../service/GameService';
import { GameController } from '../Controller/GameController';


export class GameRoutes{
    

    public router: Router;

    private game: GameController;

    public constructor() {
        this.router = Router();
        this.game = new GameController();
        this.init()

    }

    init() {
        console.log("here22")
        this.router.post('/startGame', this.game.createGameController);
        this.router.get('/getGame', this.game.getGameDataController);
        this.router.put('/updateUserGameScore', this.game.updateUserGameScoreController);
        this.router.get('/getQuestion', this.game.getQuestionController);
        

    }
}