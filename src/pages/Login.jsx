import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value.replace(/\D/g, ""));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("user"));

    let valid = true;

    if (phone.trim() === "") {
      setPhoneError("Số điện thoại không được để trống.");
      valid = false;
    } else if (!userData || userData.phone !== phone.trim()) {
      setPhoneError("Số điện thoại không khớp.");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (password.trim() === "") {
      setPasswordError("Mật khẩu không được để trống.");
      valid = false;
    } else if (!userData || userData.password !== password.trim()) {
      setPasswordError("Mật khẩu không khớp.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      alert("Đăng nhập thành công!");
      navigate("/home");
    }
  };

  return (
    <div className="login-container">
      <a href="/" className="back-button">
        <i className="fas fa-arrow-left"></i>
      </a>

      <div className="app-title">
        <h1>Zola</h1>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <p className="form-title">Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</p>

        <input
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Số điện thoại"
          className="input-field"
        />
        {phoneError && <div className="error-message">{phoneError}</div>}

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            className="input-field"
          />
          <button
            type="button"
            id="toggle-password"
            className="show-password"
            onClick={handleTogglePassword}
          >
            {showPassword ? "Ẩn" : "Hiện"}
          </button>
        </div>
        {passwordError && <div className="error-message">{passwordError}</div>}

        <div className="form-actions">
          <a href="#" className="forgot-password">Lấy lại mật khẩu</a>
          <button type="submit" className="login-button">Đăng nhập</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
