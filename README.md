# Contact List Manager

A web application built using **React**, **Node.js (Express)**, and **MongoDB**. The app allows users to add, view, search, edit, and delete contact information.

---

## Features

* Add new contacts (Filed Names : first name, last name, email)
* Edit existing contacts
* Delete contacts with confirmation
* Search contacts by name or email

---

## Tech Stack

* **Frontend**: React, Material UI
* **Backend**: Node.js, Express
* **Database**: MongoDB

---

## Prerequisites

Before you begin, make sure you have the following installed:

* **Node.js** (v14.x required)
* **npm** (comes with Node.js)
* **MongoDB** (local instance)

---

## Project Structure

```
contact-list-manager-app/
├── contact-manager-frontend/   # React frontend
├── contact-manager-backend/    # Express backend
```

---

## Setup Instructions

### 1. Clone the repository

```bash
https://github.com/yourusername/contact-list-manager-app.git
cd contact-list-manager-app
```

### 2. Install Frontend Dependencies

```bash
cd contact-manager-frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd contact-manager-backend
npm install
```
### 4. Create .env file in the contact-manager-backend folder under the root add the below variables in the .env file

```bash
MONGO_URI=mongodb://localhost:27017/contact-manager
PORT=4500

```


---

## Starting MongoDB

### Method 1: Running MongoDB from Command Prompt (Default Localhost)

```bash
mongod
```

If `mongod` is not recognized, make sure MongoDB's `bin` folder is added to your system `PATH`.

### Method 2: MongoDB Compass (GUI)

You can also use **MongoDB Compass** to visualize data and check collections.

---

## Running the App in Visual Studio Code Terminal

### 1. Run Backend

Open terminal in `contact-manager-backend` folder:

```bash
npm run dev
```

Server will run on `http://localhost:4500`

### 2. Run Frontend

Open new terminal in `contact-manager-frontend` folder:

```bash
npm start
```

App will run on `http://localhost:3000`

---

## Running Tests

### Backend Tests (Jest + Supertest)

```bash
cd contact-manager-backend
npm test
```

### Frontend Tests (React Testing Library + Jest)

```bash
cd contact-manager-frontend
npm test
```


## API Endpoints (Backend)

* `GET /api/contacts` - Get all contacts 
* `POST /api/contacts` - Add a new contact
* `PUT /api/contacts/:id` - Update a contact
* `DELETE /api/contacts/:id` - Delete a contact

---

## Application Overview

The Contact Manager is a beginner-friendly full-stack CRUD (Create, Read, Update, Delete) web application that helps users manage a personal contact list. It features a clean and modern user interface built with React and Material UI, and is backed by a Node.js + Express server with MongoDB as the database.

This app allows users to:

* Add new contacts with validation for required fields and email format

* Edit existing contacts with form pre-population

* Delete contacts with confirmation

* Search contacts by name or email using a filter

* Handle errors such as duplicate emails or missing fields directly on the screen



