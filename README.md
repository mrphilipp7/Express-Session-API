
# API built with Expressjs to communicate with a MongoDB backend.

This small application is an example of how a user can utilize node frameworks to make a working API with session based authentication.




## Usage
Make sure you already have Node.js installed and a MongoDB ready to connect with.

1.     npm i 
2.   create your .env file and fill it with 
- MONGODB_URI
- SESSION_SECRET
- NODE_ENV
- ALLOWED_ORIGIN

## Features
The API implements the use of JWTs with an access token and refresh token. The Refresh Token is handled as an http cookie while the Access token is handled has a Bearer token
