import { Request, Response } from 'express';
export declare class GameController {
    createGameController(req: Request, res: Response): Promise<void>;
    getGameDataController(req: Request, res: Response): Promise<void>;
    updateUserGameScoreController(req: Request, res: Response): Promise<void>;
    getQuestionController(req: Request, res: Response): Promise<void>;
}
