# 🚀 Portfolio Contact Form - Setup Guide

## Overview

This project has been split into two parts:
1. **Frontend** (React/Vite) - Your portfolio website
2. **Server** (Node.js/Express) - Handles form submissions and saves to Excel

## 📁 Project Structure

```
motion-storyteller-portfolio/
├── src/                    # Frontend React code
├── server/                 # Backend Node.js server
│   ├── server.js          # Main server file
│   ├── package.json       # Server dependencies
│   ├── contact-submissions.xlsx  # Excel file (auto-created)
│   └── README.md          # Server documentation
├── .env                   # Frontend environment variables
└── package.json           # Frontend dependencies
```

## 🛠️ Local Development Setup

### Step 1: Start the Backend Server

```bash
# Navigate to server directory
cd server

# Install dependencies (already done)
npm install

# Start the server
npm run dev
```

The server will run on `http://localhost:5000`

### Step 2: Start the Frontend

Open a new terminal:

```bash
# From project root
npm run dev
```

The frontend will run on `http://localhost:5173`

### Step 3: Test the Form

1. Open `http://localhost:5173` in your browser
2. Navigate to the contact section
3. Fill out and submit the form
4. Check `server/contact-submissions.xlsx` to see the saved data

## 📊 Excel File

The Excel file (`contact-submissions.xlsx`) will be automatically created in the `server/` folder with these columns:
- **Timestamp** - When the form was submitted
- **Name** - User's name
- **Email** - User's email
- **Message** - User's message

## 🌐 Deployment

### Deploy Backend Server

**Option 1: Render (Recommended)**
1. Push code to GitHub
2. Go to [Render](https://render.com)
3. Create a new "Web Service"
4. Connect your GitHub repository
5. Settings:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Deploy!

**Option 2: Railway**
1. Go to [Railway](https://railway.app)
2. Create new project from GitHub
3. Set root path to `/server`
4. Deploy automatically

**Option 3: Heroku**
1. Create `server/Procfile`:
   ```
   web: node server.js
   ```
2. Deploy using Heroku CLI

### Deploy Frontend

**Vercel (Recommended):**
1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variable:
   - `VITE_API_URL` = your deployed server URL
4. Deploy!

**Netlify:**
1. Push code to GitHub
2. Import project on [Netlify](https://netlify.com)
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variable:
   - `VITE_API_URL` = your deployed server URL
5. Deploy!

## ⚙️ Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000  # Local
# VITE_API_URL=https://your-server.onrender.com  # Production
```

### Backend (server/.env) - Optional
```env
PORT=5000
```

## 🔒 Important Notes

1. **Excel File Storage**: The Excel file is stored on the server. For cloud deployments with ephemeral storage (like Heroku), consider:
   - Using a database (MongoDB, PostgreSQL)
   - Cloud storage (AWS S3, Google Cloud Storage)
   - Or deploy to a service with persistent storage (Render with paid plan)

2. **CORS**: The server is configured to accept requests from any origin. For production, update the CORS settings in `server/server.js`

3. **Security**: Add rate limiting and validation for production use

## 📝 API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/health` - Check server status
- `GET /` - Server info

## 🐛 Troubleshooting

**Form submission fails:**
- Ensure backend server is running
- Check browser console for errors
- Verify `VITE_API_URL` is correct
- Check backend logs for errors

**Excel file not created:**
- Server may not have write permissions
- Check server logs for errors

## 📞 Support

For issues or questions, check the server logs or frontend browser console.
