
# API built with Expressjs to communicate with a mySQL backend.

This small application is an example of how a user can utilize node frameworks to make a working API with jwt based authentication.




## Usage
Make sure you already have Node.js installed and a mysql db ready to connect with.

1.     npm i 
2.   create your .env file and fill it with 
- MYSQL_HOST
- MYSQL_USER
- MYSQL_PASSWORD
- MYSQL_DATABASE
- ALLOWED_ORIGIN

## Features
The API implements the use of JWTs with an access token and refresh token. The Refresh Token is handled as an http cookie while the Access token is handled has a Bearer token
