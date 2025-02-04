import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import {store} from "./redux/Store"; // Ensure this file exists and is correctly exported

// Setup Axios
axios.defaults.baseURL = "https://api.themoviedb.org/3";

// Check if the environment variable is available
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTc5Y2U0MGFhZDk0NTNkNDg5YTYwMmU2OTVlMTQyMyIsIm5iZiI6MTczODQxNTg4My4xNDksInN1YiI6IjY3OWUxZjBiM2ZkOWQxMmUxZDI2MzAwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ziw9rq_3IC6gJpGDbg9RonJTG80Br6htVyDon56S4CY';
if (!accessToken) {
  console.error("Missing VITE_ACCESS_TOKEN. Check your .env file.");
} else {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
