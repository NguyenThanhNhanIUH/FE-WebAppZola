import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import "../styles/index.css";

const Landing = () => {
  return (
    <div className="card-container">
      {/* Language Selector */}
      <div className="language-selector">
        <select id="language-select">
          <option value="vi">Tiếng Việt</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* App Title */}
      <div className="app-title">
        <h1>Zola</h1>
      </div>

      {/* Buttons */}
      <div className="buttons">
        <Link to="/login" className="login">
          Đăng nhập
        </Link>
        <Link to="/signup" className="signup">
          Tạo tài khoản mới
        </Link>
      </div>
    </div>
  );
};

export default Landing;
