# IPL Tracker

A modern web application for tracking IPL (Indian Premier League) cricket matches, teams, and statistics. Built with Angular for the frontend and Node.js/Express for the backend.

## Features

- User Authentication (Login/Register)
- Match Tracking
- Team Statistics
- Admin Dashboard
- Responsive Design

## Tech Stack

- Frontend: Angular with Material UI
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Gopi3156/iplTracker.git
cd iplTracker
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the application:
```bash
# Start backend server
cd backend
npm start

# Start frontend development server
cd frontend
ng serve
```

5. Open your browser and navigate to `http://localhost:4200`

## Contributing

Feel free to submit issues and pull requests.

## License

MIT License 