const axios = require("axios");

// Create an instance of axios without default headers
const api = axios.create({
  baseURL: "http://localhost:3007/api/",
});

async function login(email, password) {
  try {
    const response = await api.post("users/login", {
      email: email,
      password: password,
    });

    const token = response.data.accessToken;

    // Set the token as default Authorization header for api
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

// Define a function to refresh the access token
async function refreshToken() {
  try {
    // Make a request to your API endpoint for generating a new access token
    const response = await api.get("refresh/");

    // Assuming your refresh token endpoint returns a new token
    const newToken = response.data.accessToken;

    // Set the new token as the default Authorization header for api
    api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

    return response;
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error; // Optionally handle refresh failure
  }
}

// Example request function with token refresh on failure
async function checkSession(url, options = {}) {
  try {
    return await api.get("session/status");
  } catch (error) {
    // If error is due to unauthorized (token expired)
    if (error.response && error.response.status === 403) {
      console.log("Token expired, refreshing...");
      await refreshToken(); // Attempt to refresh token
      // Retry original request
      return await api.get("session/status");
    } else {
      // Handle other errors
      throw error;
    }
  }
}

//------- SQL Server -------//
/*
The queries may be incorrect so change them as needed. 
Make sure to change the .env to include the mySQL connection variables. 
*/
