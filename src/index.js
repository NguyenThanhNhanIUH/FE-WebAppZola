// src/index.js (do dùng create-react-app)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css"; // nếu bạn dùng global styles
import "./styles/index.css";  // nếu có thêm style cho landing

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
