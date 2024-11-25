# Project Setup Guide

## Getting Started


---

## Frontend Setup

1. **Clone the Repository**
   ```bash
   git clone <repository_url>

2. **Navigate to the Frontend Directory**
    ### `cd client`
    ```bash
    cd client

3. **Install Dependencies**
    ```bash
    npm install

4. **Start the Frontend**
    ```bash
    npm start

5. Open your browser and navigate to:
    http://localhost:3000

## Backend Setup

This project includes two server implementations: **PHP Server** and **Go Lang Server**.

---

### PHP Server

1. **Navigate to the PHP Server Directory**  
   ```bash
   cd server

2. **Database Configuration**

- Update the database credentials in the `dbconnection.php` file with your username, password, and database details.
- Design the required databases and tables as per the project requirements.

### Go Lang Server

1. **Navigate to the Go Server Directory**  
   ```bash
   cd server1

2. **Run the Go Server**
    ```bash
    go run main.go

- The Go server will run at: http://localhost:12347

### Key Notes

- Ensure you have **Node.js**, **npm**, **PHP**, and **Go** installed on your system.
- Make sure the database is set up and running before starting the servers.
- Use the appropriate endpoints to test the backend services with the frontend.





