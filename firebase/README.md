# Firebase setup

The original Firebase project `mooviegle-app-default-rtdb` returns **HTTP 423 Locked**. To restore login and collection:

1. Create a new Firebase project in [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password).
3. Create **Realtime Database** and deploy rules from [`database.rules.json`](database.rules.json):
   ```bash
   firebase deploy --only database
   ```
4. Copy API key and database URL into local env files:
   ```bash
   cp src/environments/environment.example.ts src/environments/environment.ts
   cp src/environments/environment.example.ts src/environments/environment.prod.ts
   ```
5. Update `firebaseApiKey` and `firebaseDatabaseUrl` in both environment files.

Collection path used by the app: `/api/filmsCollection.json`
