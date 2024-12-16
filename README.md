🎳 Bowling Game Backend
A robust backend API for precise and complex bowling score calculations.

✨ Key Features
🌀 Strike Handling: Advanced rules support for strikes (up to 15 pins).
➕ Cumulative Bonus Calculation: Automatic bonus point addition for strikes and spares.
📜 Official Rule Validation: Complies with bowling standards.
🌟 Perfect Game Detection: Automatic recognition of perfect scores (300 points).
💾 Score Persistence: Saves and manages score history.

🚀 Technologies
Node.js
Express
MongoDB
TypeScript
Jest
📦 Installation
Clone the repository:

git clone https://github.com/judilegend/Bowling-back.git  
cd Bowling-back
Install dependencies:

npm install --legacy-peer-deps
Set up the environment:

Copy the example environment file:

cp .env.example .env
Edit the .env file with your MongoDB credentials.
Start the server in development mode:

npm run dev

📚 API Endpoints

Score Calculation
Endpoint:
POST /api/scores/calcul
Payload Example:

{
  "playerName": "John Doe",
  "frames": [
    [10, 4, 1],
    [7, 3, 2],
    [9, 0, 1],
    [10, 0, 5],
    [10, 1, 1]
  ]
}
Score History
Endpoint:
GET /api/scores/historique

🎯 Scoring Logic
Throw Validation: Ensures valid inputs for each frame.
Bonus Calculation: Handles bonuses for strikes and spares.
Last Frame Rules: Special handling for the 10th frame.
Perfect Game Detection: Recognizes perfect scores (300 points).
Real-Time Cumulative Scoring: Dynamically updates scores after each throw.

🗃️ Data Models

Game
typescript

interface Game {
  playerName: string;
  frames: Frame[];
  totalScore: number;
  date: Date;
}
Frame
typescript

interface Frame {
  throws: number[];
  frameScore: number;
  isStrike: boolean;
  isSpare: boolean;
}
🔄 Available Scripts
Start in Development Mode:

npm run dev
Run Tests:

npm run test
Build for Production:

npm run build
Start in Production Mode:

bash
npm start
🧪 Tests

Unit tests for scoring logic.
Integration tests for API endpoints.
Scenarios validating official rules, including perfect games.

📊 Performance
MongoDB Caching: Ensures fast responses.
Optimized Algorithms: Improves calculation efficiency.
Asynchronous Validation: Handles validations and errors efficiently.

🔐 Security

Input Validation: Strict checks on incoming API data.
Data Sanitization: Prevents security vulnerabilities.
Rate Limiting: Protects against API abuse.
Error Handling: Secure and clear error messages.

📝 API Documentation

Swagger documentation available at:
/api-docs
🛠️ Development Tools
ESLint: Code linting.
Prettier: Automatic formatting.
Nodemon: Hot reloading during development.
TypeScript: Static typing for robust code.
Jest: Testing framework.

📈 Monitoring

Structured Logs: Tracks requests and errors.
Performance Metrics: Monitors real-time performance.
Alerts: Notifies about system incidents.

📝 License
This project is licensed under the MIT License.
