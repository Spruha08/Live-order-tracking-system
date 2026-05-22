# Live Food Order Tracking System

A real-time food delivery tracking system built using FastAPI, MySQL, WebSockets, HTML, CSS, and JavaScript.
This project allows restaurants to manage food orders and customers to track their orders live in real time.

---
# Features
## Restaurant Dashboard
- Create new food orders
- Update order status
- Manage all customer orders
- Real-time order updates
## Customer Dashboard
- Track personal food orders
- View live delivery status
- Receive instant updates using WebSockets
## Real-Time Functionality
- WebSocket integration for live updates
- Automatic status refresh without page reload
- Live notification system
---
# Tech Stack
## Backend
- FastAPI
- Python
- MySQL
- SQLAlchemy
- WebSockets
## Frontend
- HTML
- CSS
- JavaScript
---
# Project Structure
backend
│
├── database.py
├── main.py
├── models.py
├── schemas.py
└── websocket_manager.py

frontend
│
├── index.html
├── customer.html
├── restaurant.html
├── style.css
└── script.js

How It Works:-
1)Restaurant creates a food order
2)Order gets stored in MySQL database
3)Customer tracks their order using their name
4)Restaurant updates order status
5)WebSocket sends live updates instantly
6)Customer receives real-time notifications

How To Run:-
Backend:
uvicorn app.main:app --reload
Backend runs on:
http://127.0.0.1:8000

Frontend:
Open:
index.html
using Live Server in VS Code

Screenshots:-
Project screenshots have been included in the submission

Future Improvements:-
1)Authentication system
2)Customer login/signup
3)Payment integration
4)Delivery partner tracking
5)Mobile responsive design

Author:-
Spruha Umarani
