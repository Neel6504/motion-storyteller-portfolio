# Portfolio Contact Form Server

Backend server for handling contact form submissions and saving them to MongoDB Atlas.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your MongoDB connection:
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB Atlas credentials:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
```

4. Start the server:
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### POST /api/contact
Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss a project."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Form submitted successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-12-28T10:30:00.000Z"
  }
}
```

### GET /api/contacts
Get all contact submissions (sorted by newest first).

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Hello, I'd like to discuss a project.",
      "createdAt": "2025-12-28T10:30:00.000Z"
    }
  ]
}
```

### GET /api/health
Check server health status.

## Database

All submissions are saved to **MongoDB Atlas** with the following schema:
- `name` (String, required, max 100 chars)
- `email` (String, required, max 255 chars)
- `message` (String, required, max 1000 chars)
- `createdAt` (Date, auto-generated)

## Deployment

### Deploy to Render / Railway / Heroku

1. Push your code to GitHub
2. Connect your repository to the deployment platform
3. Set the root directory to `/server`
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Set environment variables if needed

### Deploy to Vercel (as Serverless Function)

Create `server/vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

Don't forget to set the `MONGODB_URI` environment variable in your deployment platform!

## Environment Variables

- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB Atlas connection string (required)
- `CORS_ORIGIN`: Allowed origin for CORS (optional, defaults to allow all)

## MongoDB Atlas Setup

1. Go to MongoDB Atlas (cloud.mongodb.com)
2. Create a cluster (if you haven't already)
3. Create a database user with password
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
5. Get your connection string from "Connect" > "Connect your application"
6. Replace `<password>` with your actual password in the connection string
7. Add it to your `.env` file
