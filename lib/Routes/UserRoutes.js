"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
var express_1 = require("express");
var UserController_1 = require("../Controller/UserController");
var userRoutes = /** @class */ (function () {
    function userRoutes() {
        this.router = (0, express_1.Router)();
        this.user = new UserController_1.userController();
        this.init();
    }
    userRoutes.prototype.init = function () {
        console.log("here22");
        this.router.post('/createUser', this.user.createuserController);
        this.router.put('/updateUser', this.user.updateUserController);
        this.router.put('/updateHigestScore', this.user.updateHigestScoreController);
        this.router.get('/getUser', this.user.getUserController);
    };
    return userRoutes;
}());
exports.userRoutes = userRoutes;
//# sourceMappingURL=UserRoutes.js.map