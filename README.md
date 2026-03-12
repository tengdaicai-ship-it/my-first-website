# Contact Manager

A simple full-stack contact management application built with Node.js, Express, and Vanilla JavaScript.

The project demonstrates REST API design, client-server communication using Fetch, and JSON-based data persistence.

## Demo

This application allows users to submit messages through a contact form.
Submitted messages are displayed instantly and can be removed from the list.

Main features demonstrated in this project:

- REST API with Express
- Fetch API communication
- JSON-based data persistence

## Features

- Submit contact messages through a form
- Display stored messages dynamically
- Delete messages from the list
- RESTful API built with Express
- File-based persistence using JSON

## Tech Stack

- Node.js
- Express
- Vanilla JavaScript
- HTML
- CSS

---

## Screenshots

### Main Interface

![Main UI](./screenshots/app.png)

### Contact Form

![Contact Form](screenshots/contact.png)

### Admin Dashboard

![Admin Page](screenshots/admin.png)

---

## Project Structure

```
contact-manager
│
├── public
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── screenshots
│   ├── app.png
│   ├── contact.png
│   └── admin.png
│
├── messages.json
├── server.js
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|------|------|-------------|
| GET | /api/contact | Get all contact messages |
| POST | /api/contact | Create a new message |
| DELETE | /api/contact/:id | Delete a message |

## Setup

```bash
git clone https://github.com/tengdaicai-ship-it/my-first-website.git
cd contact-manager
npm install
node server.js
```

Open in browser:

http://localhost:3000

---

## Learning Goals

This project was built to practice:

- Building REST APIs with Express
- Using the Fetch API
- Client and server validation
- File-based data persistence
- Understanding CRUD fundamentals

---

## Future Improvements

- Add update functionality (complete CRUD)
- Add timestamps to messages
- Replace JSON storage with a database (SQLite / PostgreSQL)
- Improve UI styling
- Add pagination for large message lists

---