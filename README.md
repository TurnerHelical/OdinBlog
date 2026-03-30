📘 OdinBlog – Full Stack Blog Platform /br
🚀 Overview

OdinBlog is a full stack blog application that allows admin-approved users to create and publish posts, while authenticated users can comment and interact with content.

This project focuses on building real-world application patterns, including authentication, protected routes, and coordinated frontend/backend data handling using modern React tools.

🧰 Tech Stack
Frontend
React
React Router (loaders & actions)
JavaScript (ES6+)
Backend
Node.js
Express
Database
PostgreSQL
Prisma ORM
Authentication
JWT (JSON Web Tokens)
httpOnly cookies
Access + refresh token flow
🔐 Authentication System

This project implements a secure authentication flow designed to maintain user sessions while protecting sensitive data.

Access token used for authenticated API requests
Refresh token stored in httpOnly cookie (not accessible via JavaScript)
Token expiration handling
Automatic token refresh:
On page reload
On failed authenticated requests (retry once)

This allows users to stay logged in without exposing sensitive tokens to the client.

✨ Features
Admin-controlled publishing system
Create, edit, and publish blog posts
User authentication and protected routes
Comment system (create, edit, delete)
User profiles with post/comment visibility
API-driven communication between frontend and backend
🧠 What I Learned
Designing and implementing JWT authentication systems
Handling token expiration and refresh securely
Structuring full stack applications with clear separation of concerns
Using React Router loaders/actions for data fetching and mutations
Coordinating frontend and backend state in authenticated apps
Debugging async workflows and edge cases
🚧 Current Improvements

This project is actively being developed. Planned improvements include:

Pagination for posts and comments
Additional security hardening
Admin panel for managing users and content
Improved UI/UX and responsive design
🛠️ Getting Started
1. Clone the repository
git clone https://github.com/TurnerHelical/odinblog.git
cd odinblog
2. Install dependencies
Backend
cd backend
npm install
Frontend
cd frontend
npm install
3. Environment Variables

Create a .env file in your backend directory:

PORT=your_port
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
4. Run the app
Start backend
npm run dev
Start frontend
npm run dev
5. Open in browser
http://localhost:your_frontend_port
📌 Notes
This project is not currently deployed and is intended to be run locally
Focus is on architecture, authentication, and full stack design rather than final UI polish
📷 Screenshots (Recommended)

Add screenshots or a short GIF here to showcase functionality

👤 Author

Hunter LeClair
GitHub: https://github.com/TurnerHelical
