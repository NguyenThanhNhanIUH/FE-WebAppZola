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
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#2d3748", margin: "0", overflow: "hidden" }}>
      <div className="card text-center text-white p-5" style={{ 
        width: "500px", 
        borderRadius: "20px", 
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.4)", 
        backgroundColor: "#2d3748" 
      }}>
        <a
          href="/"
          className="btn btn-primary rounded-circle"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i className="fas fa-arrow-left"></i>
        </a>
        <div className="mb-4">
          <h1 className="fw-bold text-primary" style={{ fontSize: "80px" }}>Zola</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <p 
            className="mb-4" 
            style={{ color: "#a0aec0" }}
          >
            Vui lòng nhập số điện thoại và mật khẩu để đăng nhập
          </p>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Số điện thoại"
              className="form-control"
              style={{
                backgroundColor: "#1a202c",
                color: "#a0aec0",
                border: "1px solid #4a5568",
                borderRadius: "10px",
                padding: "15px",
                fontSize: "16px",
              }}
            />
            {phoneError && <div className="text-danger mt-1 text-start">{phoneError}</div>}
          </div>
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              className="form-control"
              style={{
                backgroundColor: "#1a202c",
                color: "#a0aec0",
                border: "1px solid #4a5568",
                borderRadius: "10px",
                padding: "15px",
                fontSize: "16px",
              }}
            />
            <button
              type="button"
              className="btn btn-primary position-absolute"
              style={{
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                backgroundColor: "#3182ce",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 15px",
                fontSize: "14px",
                zIndex: 1,
              }}
              onClick={handleTogglePassword}
            >
              {showPassword ? "Ẩn" : "Hiện"}
            </button>
            <div
              className="text-danger mt-1 text-start"
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                fontSize: "12px",
              }}
            >
              {passwordError}
            </div>
          </div>
          <div className="d-flex flex-column align-items-center mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "#3182ce",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "18px",
                fontWeight: "bold",
                padding: "15px",
                width: "100%",
              }}
            >
              Đăng nhập
            </button>
            <a
              href="#"
              className="text-primary mt-3"
              style={{
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              Lấy lại mật khẩu
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
