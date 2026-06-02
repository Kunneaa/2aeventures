# Demo Deploy on Render

This project can be demoed on Render with two Docker web services:

- `twoae-demo-api`: FastAPI backend
- `twoae-demo-web`: Next.js frontend

Render does not run `docker-compose.yml` directly for web services. The root `render.yaml` defines the two services for Render Blueprints.

## 1. Push the Repo

Push the latest code to GitHub:

```bash
git push origin main
```

## 2. Create a Blueprint

1. Open Render Dashboard.
2. Select **New > Blueprint**.
3. Connect the GitHub repository `Kunneaa/2aeventures`.
4. Select branch `main`.
5. Render will read `render.yaml` and create:
   - `twoae-demo-api`
   - `twoae-demo-web`

Expected demo URLs:

```text
https://twoae-demo-web.onrender.com
https://twoae-demo-api.onrender.com
```

## 3. Verify Environment URLs

If Render creates a different service URL, update these values in Render:

Backend service:

```text
BACKEND_CORS_ORIGINS=https://YOUR_FRONTEND_SERVICE.onrender.com
```

Frontend service:

```text
API_PROXY_TARGET=https://YOUR_BACKEND_SERVICE.onrender.com
NEXT_PUBLIC_API_URL=/api/v1
```

Then redeploy both services.

## 4. Data Behavior on Free Render

The backend currently stores contact and quote submissions as JSONL files.

On Render Free web services, the filesystem is ephemeral. Data written by the running service can be lost when the service redeploys, restarts, or spins down.

For a public demo, this is acceptable if you only need users to browse and test the flow. For reliable lead capture, upgrade the backend service and attach a persistent disk, or move submissions to a managed database later.

## 5. Free Plan Notes

Render Free web services spin down after 15 minutes without traffic. The first visitor after idle time may wait around one minute while the frontend and backend wake up.

This is fine for a temporary demo. For a smoother public demo, upgrade both services to a paid instance type.
