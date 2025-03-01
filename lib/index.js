"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
// Importing routers
var GameRoutes_1 = require("./Routes/GameRoutes");
var UserRoutes_1 = require("./Routes/UserRoutes");
var game = new GameRoutes_1.GameRoutes();
var user = new UserRoutes_1.userRoutes();
//Importing admin routers
// Initialize Express app
var app = (0, express_1.default)();
// Connect to database
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json({ extended: false }));
console.log("here1");
// Routes
app.use("/api/games", game.router);
app.use("/api/players", user.router);
// Start the server process.env.PORT ||
var PORT = 8080;
app.listen(PORT, function () {
    console.log("server started", PORT);
});
//# sourceMappingURL=index.js.map