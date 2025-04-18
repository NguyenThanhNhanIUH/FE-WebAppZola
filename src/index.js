// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import "./styles/global.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
