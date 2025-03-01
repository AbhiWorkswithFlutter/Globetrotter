import {Router, Request, Response} from 'express';
import { UserService } from '../service/UserService';
import { userController } from '../Controller/UserController';


export class userRoutes{
    

    public router: Router;

    private user: userController;

    public constructor() {
        this.router = Router();
        this.user = new userController();
        this.init()

    }

    init() {
        console.log("here22")
        this.router.post('/createUser', this.user.createuserController);
        this.router.put('/updateUser', this.user.updateUserController);
        this.router.put('/updateHigestScore', this.user.updateHigestScoreController);
        this.router.get('/getUser', this.user.getUserController);

    }
}