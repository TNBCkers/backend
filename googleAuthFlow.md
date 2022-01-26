# Google Authorization Flow

Refering [this](https://developers.google.com/identity/sign-in/web/backend-auth) resource for auth flow.

- On sign In get User's ID token.
- Send that ID token to backend.
- Use google py library to verify token.
- Finally get `sub` and use that as unique identifier in DB.
- If user is present in db, estabilish a session.
- Else create new record.

