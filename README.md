Here's a sample `README.md` file for your GitHub project, incorporating the details you've provided:

# CS 3105 Express.js Backend Project

## Project Description
This project is an exercise for our subject CS 3105, where we are tasked to create an Express.js backend with a model-controller setup. The backend includes custom middleware for logging, authentication, and rate limiting. The project is built using TypeScript, and utilizes Joi for input validation and JWT for authentication tokens.

## Project Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/jonathan-christ/express-backend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd express-backend
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Customize environment variables: (Optional)
   ```env
   # ./config/env.ts
     JWT_SECRET: process.env.JWT_SECRET || 'CS_3105-ExPrEssBacKeNd',
     PORT: process.env.PORT || 8080,
     RATE_LIMIT_MAX_REQ: Number(process.env.MAX_REQUESTS) || 5,   // max requests per interval (default: 5)
     RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS) || 30 * 1000  //window duration in ms (default: 30s)
   ```

5. Start the server:
   ```bash
   npm start
   ```
   ```bash
   npm run dev
   ```

## Project Usage / Testing

You can test the API endpoints using PowerShell but Postman is highly recommended. Here are the available routes:

### 1. Login
**Endpoint:** `POST /login`

- **Request Body:**
  ```json
  {
    "username": "yourUsername",
    "password": "yourPassword"
  }
  ```

- **PowerShell Command:**
  ```powershell
  Invoke-WebRequest -Uri "http://localhost:8080/login" -Method POST -Body '{"username": "yourUsername", "password": "yourPassword"}' -ContentType "application/json"
  ```

### 2. Register
**Endpoint:** `POST /register`

- **Request Body:**
  ```json
  {
    "username": "yourUsername",
    "password": "yourPassword",
    "email": "yourEmail@example.com"
  }
  ```

- **PowerShell Command:**
  ```powershell
  Invoke-WebRequest -Uri "http://localhost:8080/register" -Method POST -Body '{"username": "yourUsername", "password": "yourPassword", "email": "yourEmail@example.com"}' -ContentType "application/json"
  ```

### 3. Profile
**Endpoint:** `GET /profile`

- **Headers:**
  - Authorization: Bearer `your_token_here`

- **PowerShell Command:**
  ```powershell
  $token = "your_token_here" # Replace with your actual token
  Invoke-WebRequest -Uri "http://localhost:8080/profile" -Method GET -Headers @{Authorization = "Bearer $token"}
  ```

### Note
Currently, `curl` is not working on my end, but you can use it similarly to how you would use PowerShell for the above requests.
