Welcome to the "Globetrotter" web app! This project allows users to solve cryptic clues that lead them to famous travel destinations. After guessing the correct place, users unlock fun facts, trivia, and other surprises about the destination.

**This is a Backend specific project, with touch of frontend skills**

access from here https://globetrotter-1-u2s4.onrender.com/


**Features**
Cryptic clues related to famous destinations.
Guess the correct destination based on the given clue.
Unlock fun facts, trivia, and surprises about each destination.
User-friendly interface with a simple yet engaging experience.


**Tech Stack**
**Backend**
TypeScript for strong typing and better development experience.
Node.js & Express to handle requests and serve APIs.
MongoDB for efficient and flexible data storage.
**Controller-Service-Repository Design Pattern** to handle routing and requests:
**Router layer** handels the incoming request from the middleware mentioned in index.
**Controller layer** receive request from router and interacts with service lauer.
**Service layer** handels all the manipulation and logical part with the help of Dao.

**Frontend**
HTML, CSS, and JavaScript for the user interface.

**Setup**
(prerequiste is node)
1. Clone the Repository
2. Install Dependencie with npm i
3. start backend with npm run start
4. Run index.html for frontend


**Features & Architecture**
Backend
The backend is built using Express.js and follows the Controller-Service-Repository design pattern for efficient routing and request handling.
Database Schemas: Designed to store cryptic clues, destination details, and user progress.
APIs: Expose endpoints for clue retrieval, answer validation, and unlocking destination trivia.
Frontend
Simple HTML, CSS, and JavaScript are used for the user interface.
The frontend fetches data from the backend and displays it to the user.
