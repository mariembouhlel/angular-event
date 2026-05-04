# Projet-Event - Event Management Application

## Project Structure

This project follows a MEAN stack architecture with organized backend and frontend folders.

### Backend (`/backend`)

```
backend/
├── config/
│   └── db.js              # MongoDB configuration
├── controllers/           # Business logic for routes
│   ├── evenement.controller.js
│   ├── lieux.controller.js
│   └── participants.controller.js
├── models/               # Mongoose schemas
│   ├── evenements.model.js
│   ├── lieux.model.js
│   └── participants.model.js
├── routes/              # API routes
│   ├── evenement.routes.js
│   ├── lieux.routes.js
│   └── participants.routes.js
├── middleware/          # Express middleware (for future use)
├── uploads/             # Uploaded files directory (for images, etc.)
├── .env                 # Environment variables
├── app.js              # Main application file
└── package.json        # Dependencies
```

**Running the Backend:**
```bash
cd backend
npm install
npm start
```

The server will run on `http://localhost:3000`

### Frontend (`/frontend/gestionEvent`)

```
src/
└── app/
    ├── components/      # Reusable UI components
    │   └── evenements/
    ├── pages/          # Full page components (for routing)
    ├── services/       # API communication services
    ├── models/         # TypeScript interfaces/models
    ├── guards/         # Route guards for authentication/authorization
    ├── app.routes.ts   # Application routing
    └── app.config.ts   # Application configuration
```

**Running the Frontend:**
```bash
cd frontend/gestionEvent
npm install
ng serve
```

The application will be available at `http://localhost:4200`

## API Endpoints

### Evenements (Events)
- `POST /api/evenements` - Create event
- `GET /api/evenements` - Get all events (with filters: date, lieu, search)
- `GET /api/evenements/:id` - Get event by ID
- `PUT /api/evenements/:id` - Update event
- `DELETE /api/evenements/:id` - Delete event

### Lieux (Venues)
- `POST /api/lieux` - Create venue
- `GET /api/lieux` - Get all venues (with search filter)
- `GET /api/lieux/:id` - Get venue by ID
- `PUT /api/lieux/:id` - Update venue
- `DELETE /api/lieux/:id` - Delete venue

### Participants
- `POST /api/participants` - Create participant
- `GET /api/participants` - Get all participants (with filters: evenement, search)
- `GET /api/participants/:id` - Get participant by ID
- `PUT /api/participants/:id` - Update participant
- `DELETE /api/participants/:id` - Delete participant

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment configuration

### Frontend
- **Angular** - Frontend framework
- **TypeScript** - Language
- **Angular Routing** - Navigation

## Environment Variables

Create a `.env` file in the backend directory:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
PORT=3000
```

## Notes

- The old `src/` directory structure has been reorganized
- All imports have been updated to reflect the new file structure
- The backend uses `app.js` as the entry point (instead of `server.js`)
- Models are loaded from the new `config/db.js` file
- The application is ready for adding middleware, authentication guards, and upload handling
