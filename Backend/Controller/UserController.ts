import {Request, Response} from 'express';
import { UserService } from '../service/UserService';


export class userController{

    


    public async createuserController(req:Request, res:Response){

        let ob = UserService.getInstance();
        ob.createUser(req.body).then(user => {
            res.send(user);
        })

    }

    public async updateUserController(req:Request, res:Response) {
        let ob = UserService.getInstance();
        ob.updateUser(req.body).then(user => {
            res.send(user);
        })
        
    }

    public async updateHigestScoreController(req:Request, res:Response) {
        let ob = UserService.getInstance();
        ob.updateHigestScore(req.body).then(data => {
            res.send(data);
        })
        
    }

    public async getUserController(req:Request, res:Response) {
        let ob = UserService.getInstance();
        ob.getUser(req.query.username).then(user => {
            res.send(user);
        })
        
    }

    





    

    
}