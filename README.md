# AI-Powered Real-Time Delivery Route Optimization System

This project is a full-stack web application that plans and optimizes delivery routes for vehicles and dynamically re-routes them based on predicted traffic conditions and simulated real-time incidents.

The system demonstrates how AI-assisted decision-making, geospatial data, and real-time UI updates can be combined to solve logistics and routing problems.

---

## 🚀 Features

- Store delivery locations and vehicle data using MongoDB with geospatial indexes
- Interactive map visualization using MapLibre (Mapbox-style maps)
- AI-based traffic prediction (time-based heuristic, extendable to Gemini/OpenAI)
- Route optimization using distance-based heuristic (nearest neighbor)
- Dynamic re-routing when incidents occur
- Real-time ETA recalculation without page refresh

---

## 🛠️ Tech Stack

### Frontend
- React.js
- MapLibre GL
- Axios
- Vite

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- REST APIs

### AI / Logic
- AI-assisted traffic prediction (heuristic model)
- Haversine distance calculation
- Route optimization service

---

## 🧩 System Architecture

Frontend (React + MapLibre)  
↓  
Backend (Node.js + Express)  
↓  
MongoDB (Deliveries & Vehicles with Geo Index)  
↓  
Route Optimizer + Traffic Predictor  

---

## 📂 Project Structure

ai-route-planner/  
├── client/  
│   └── src/  
│       ├── components/  
│       ├── App.jsx  
│       └── index.css  
├── server/  
│   ├── controllers/  
│   ├── models/  
│   ├── routes/  
│   └── services/  
├── .gitignore  
└── README.md  

---

## ⚙️ How to Run Locally

### Backend
cd server  
npm install  
npx nodemon server.js

### Frontend
cd client  
npm install  
npm run dev  
