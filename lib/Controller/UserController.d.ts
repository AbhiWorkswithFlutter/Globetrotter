import { Request, Response } from 'express';
export declare class userController {
    createuserController(req: Request, res: Response): Promise<void>;
    updateUserController(req: Request, res: Response): Promise<void>;
    updateHigestScoreController(req: Request, res: Response): Promise<void>;
    getUserController(req: Request, res: Response): Promise<void>;
}
