# Weather App - Setup Guide

This project is a **full-stack weather app** with:

* **Frontend:** React (fetches data and shows dashboard)
* **Backend:** Node.js + Express (handles API calls, saves results)
* **Database:** MongoDB (via MongoDB Atlas or local MongoDB)

---

## 🚀 Features

* Search for any city and fetch weather data from OpenWeather API.
* Store results in MongoDB.
* View history of previous searches.
* Ready for deployment on **Render**.

---

## 🛠️ Requirements

* Node.js (>=16)
* npm or yarn
* MongoDB Atlas account (or local MongoDB installed)
* OpenWeather API key (free from [https://openweathermap.org/api](https://openweathermap.org/api))

---

## ⚡ Local Setup

### 1. Clone repo & install dependencies

```bash
# clone repo
git clone https://github.com/your-username/weather-app.git
cd weather-app

# install dependencies
npm install
```

---

### 2. Setup environment variables

Create a `.env` file in the project root:

```
MONGO_URI=mongodb://127.0.0.1:27017/weatherApp
API_KEY=your_openweather_api_key
```

If using **MongoDB Atlas**, replace with connection string:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/weatherApp?retryWrites=true&w=majority
API_KEY=your_openweather_api_key
```

⚠️ **Never commit `.env` to GitHub**

---

### 3. Run backend server

```bash
node server.js
```

Server runs at: `http://localhost:5000`

---

### 4. Run frontend

If React frontend is in `client/` folder:

```bash
cd client
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

Make sure `script.js` or frontend code points to the backend URL:

```js
const API_URL = "http://localhost:5000/api";
```

---

## ☁️ Deploying on Render

1. Push code to GitHub.
2. On Render dashboard:

   * Create a **Web Service** → connect GitHub repo.
   * Set **Build Command:** `npm install`
   * Set **Start Command:** `node server.js`
3. In **Environment Variables** on Render, add:

   ```
   MONGO_URI=your_atlas_connection_string
   API_KEY=your_openweather_api_key
   ```
4. Deploy → get live backend URL like `https://your-app.onrender.com`
5. Update frontend `API_URL` to point to Render backend.
6. Deploy frontend as **Static Site** on Render (or Netlify/Vercel).

---

## ✅ Test endpoints

* Search weather (via frontend form).
* Or test directly:

  ```bash
  curl https://your-app.onrender.com/api/search -X POST -H "Content-Type: application/json" -d '{"city":"London"}'
  ```
* Get history:

  ```bash
  curl https://your-app.onrender.com/api/history
  ```

---

## 📌 Notes

* Default local DB = `mongodb://127.0.0.1:27017/weatherApp`
* Atlas DB recommended for Render hosting.
* Keep `.env` private.
* Use `0.0.0.0/0` whitelist in Atlas only for testing; restrict for production.

---

## 📄 License

MIT License.
