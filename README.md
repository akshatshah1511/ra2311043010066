# RA2311043010066

A backend project built for vehicle maintenance scheduling and notification management.

## What this does

There are two main parts to this project:

1. **Vehicle Maintenance Scheduler** - fetches depots and vehicles from an external API, then uses a knapsack algorithm to figure out the best maintenance schedule that fits within each depot's available mechanic hours.

2. **Notification App Backend** - a simple Express server that lets you create and fetch notifications via REST endpoints.

3. **Logging Middleware** - a shared logger that sends logs to an external evaluation service.

## How to run

First, clone the repo and install dependencies:

```
npm install
```

Create a `.env` file in the root with:

```
TOKEN=your_access_token_here
BASE_URL=http://20.207.122.201/evaluation-service
```

To get a token, hit the auth endpoint:

```
POST http://20.207.122.201/evaluation-service/auth
```

with your credentials in the body.

### Run the scheduler

```
node vehicle_maintenance_scheduler/scheduler.js
```

### Run the notification server

```
node notification_app_be/app.js
```

Server starts at `http://localhost:3000`

## API Endpoints

### Notifications

- `GET /notifications` - get all notifications
- `POST /notifications` - create a new notification

POST body:
```json
{
  "title": "some title",
  "message": "some message",
  "type": "info"
}
```

## Project structure

```
something/
├── vehicle_maintenance_scheduler/
│   ├── scheduler.js
│   └── api.js
├── notification_app_be/
│   └── app.js
├── logging_middleware/
│   └── logger.js
├── .env          (not committed)
├── .gitignore
└── package.json
```

## Note

The external logging API may occasionally be unavailable due to server-side issues.
The application handles this gracefully and continues running without crashing.
Token expires roughly every 15 minutes so you will need to refresh it from the auth endpoint.
