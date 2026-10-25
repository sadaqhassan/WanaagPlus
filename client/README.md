# WanaagPlus client

The client provides sign-in and account creation for the WanaagPlus API.

## Run locally

Start the NestJS API, then run the client:

```bash
npm run dev
```

The authentication proxy uses `http://localhost:3000` by default. If the API
runs elsewhere, set `AUTH_API_URL` to its origin (for example,
`AUTH_API_URL=http://localhost:3001 npm run dev`).

Authentication requests are proxied to the API's `POST /auth/signin` and
`POST /auth/login` endpoints.
