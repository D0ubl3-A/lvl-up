# Production deployment: Level Up

The FastAPI API needs a Python container runtime and a MongoDB service. Sites can host the React frontend, but it does not run this FastAPI process or provide MongoDB-compatible storage.

## Backend

This repository includes a Render Blueprint and Dockerfile for the API. Deploy the Blueprint from this repository and configure these secret/input values in the backend host:

- `MONGO_URL`: production MongoDB connection string for the `lvl_up` database. Create a production MongoDB Atlas cluster; do not reuse local development data.
- `GROQ_API_KEY`: a key issued for the deployment's Groq account. Secrets from another chat or hosting provider do not transfer automatically.
- `CORS_ORIGINS`: the exact HTTPS origin of the published Sites frontend, with no path or trailing slash.
- `INITIAL_ADMIN_PASSWORD`: a unique initial admin password. The API seeds the configured initial admin only when this value is present and that user does not already exist.

Render generates `JWT_SECRET`. TTS audio is stored in MongoDB GridFS (`audio.files` and `audio.chunks`) through `AUDIO_STORAGE_BACKEND=mongodb`, so audio survives API restarts without a container disk. This increases production database storage usage.

After the backend is live, verify its `/docs` health page and `/api/public/stats`. The latter must return database-backed data before connecting the frontend.

## Frontend on Sites

Build the React app from `frontend/` with `REACT_APP_BACKEND_URL` set to the backend's public HTTPS origin. Configure SPA route fallback to `index.html`. Set the backend's `CORS_ORIGINS` to the final Sites origin before testing login and the dashboard.

Do not publish a frontend build until its backend URL is the live API origin. Verify login and an authenticated dashboard request against the production database before declaring the deployment ready.
