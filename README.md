# Contact Manager

A simple full-stack contact management application built with Node.js, Express, and Vanilla JavaScript.

Users can submit messages through a contact form, and the application displays stored messages with options to delete them.

This project was created to practice building a REST API with Express and connecting it to a simple frontend using the Fetch API.

---

## Screenshots

### Contact Form

![Contact Form](screenshots/contact.png)

### Admin Dashboard

![Admin Page](screenshots/admin.png)

---

## Features

- Submit messages through a contact form
- View submitted messages
- Delete messages
- Client-side form validation
- Server-side validation
- JSON file persistence (messages.json)
- Express Router structure
- Delete confirmation dialog
- Message count display
- Auto-hide success message
- Messages sorted by newest first

CRUD status

- Create ✔
- Read ✔
- Delete ✔
- Update ✖

---

## Tech Stack

- Node.js
- Express
- Vanilla JavaScript
- HTML / CSS

---

## System Architecture

```
Browser
   │
   │ fetch API
   ▼
Express Server (server.js)
   │
   │ Router
   ▼
routes/contact.js
   │
   │ File storage
   ▼
messages.json
```

## Data Flow

```
Contact Form
      │
      ▼
POST /api/contact
      │
      ▼
messages.json
      │
      ▼
GET /api/contact
      │
      ▼
Message List
      │
      ▼
DELETE /api/contact/:id
```

## Project Structure

```
my-first-website
│
├ server.js
├ messages.json
├ routes
│   └ contact.js
│
└ public
   ├ index.html
   ├ contact.html
   ├ script.js
   └ style.css
```

## API Endpoints

### POST /api/contact

Create a message

Example request

```json
{
"name": "John",
"email": "john@example.com",
"message": "Hello"
}
```

### GET /api/messages

Retrieve all messages.

---

### DELETE /api/messages/:id

Delete a message.

Example
```
DELETE /api/messages/1772624619725
```

## How to Run

Clone the repository

git clone https://github.com/yourname/my-first-website.git

Install dependencies

npm install

Start the server

node server.js

Open in browser

http://localhost:3000/contact.html

---

## Learning Goals

This project was built to practice:

- Building REST APIs with Express
- Using the Fetch API
- Client and server validation
- File-based data persistence
- Express Router structure
- CRUD fundamentals

---

## Future Improvements

- Add update functionality (complete CRUD)
- Add timestamps to messages
- Replace JSON storage with a database (SQLite / PostgreSQL)
- Improve UI styling
- Add pagination for large message lists

---
