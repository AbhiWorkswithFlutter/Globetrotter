import express from 'express';
import cors from 'cors';

// Importing routers
import { GameRoutes } from './Routes/GameRoutes';
import { userRoutes } from './Routes/UserRoutes';
import * as dotenv from 'dotenv';
dotenv.config(); 



const game = new GameRoutes();
const user = new userRoutes();

  



// Initialize Express app
const app = express();



// Middleware
app.use(cors());
app.use(express.json({ extended: false }));


// Routes
app.use("/api/games", game.router);
app.use("/api/players", user.router);



// Start the server 
const PORT =  process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("server started", PORT);
});