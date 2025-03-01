import express from 'express';
import cors from 'cors';
// Importing routers
import { GameRoutes } from './Routes/GameRoutes';
import { userRoutes } from './Routes/UserRoutes';



const game = new GameRoutes();
const user = new userRoutes();

  


//Importing admin routers


// Initialize Express app
const app = express();

// Connect to database

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

console.log("here1")
// Routes
app.use("/api/games", game.router);
app.use("/api/players", user.router);



// Start the server process.env.PORT ||
const PORT =  8080;
app.listen(PORT, () => {
  console.log("server started", PORT);
});