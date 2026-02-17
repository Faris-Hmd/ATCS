# Deploying ATCS Backend to Render

## Option 1: Using render.yaml (Recommended)

1.  Push your code to **GitHub** (or GitLab/Bitbucket).
2.  Go to the **Render Dashboard** -> **Blueprints**.
3.  Click **New Blueprint Instance**.
4.  Connect your repository.
5.  Render will automatically detect the `render.yaml` file.
6.  Click **Apply**.
7.  It will ask for `MONGO_URI` and `JWT_SECRET`. Enter your production values.
8.  Click **Approve**.

## Option 2: Manual Setup

If you prefer not to use Blueprints, here are the settings for a new Web Service:

- **Name**: `atcs-backend`
- **Root Directory**: `.` (Leave empty / default)
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build -w @atcs/shared` (Builds only the shared package)
- **Start Command**: `npm start -w @atcs/backend`
- **Environment Variables**:
  - `MONGO_URI`: Your MongoDB connection string
  - `JWT_SECRET`: A secure random string
  - `NODE_ENV`: `production`

## Notes

- The backend runs on the port provided by Render automatically.
- The build step compiles `@atcs/shared` so the backend can use it. It skips the frontend build.
- **Seeding**: The seeder does not run automatically on deploy. To seed the database, use the Render Shell tab after deployment:
  ```bash
  node apps/backend/seeder.js
  ```
