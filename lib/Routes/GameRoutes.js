"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRoutes = void 0;
var express_1 = require("express");
var GameController_1 = require("../Controller/GameController");
var GameRoutes = /** @class */ (function () {
    function GameRoutes() {
        this.router = (0, express_1.Router)();
        this.game = new GameController_1.GameController();
        this.init();
    }
    GameRoutes.prototype.init = function () {
        console.log("here22");
        this.router.post('/startGame', this.game.createGameController);
        this.router.get('/getGame', this.game.getGameDataController);
        this.router.put('/updateUserGameScore', this.game.updateUserGameScoreController);
        this.router.get('/getQuestion', this.game.getQuestionController);
    };
    return GameRoutes;
}());
exports.GameRoutes = GameRoutes;
//# sourceMappingURL=GameRoutes.js.map