import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(""); // Thay phone thành email
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateStep1 = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email không được để trống.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Email không hợp lệ.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!code.trim()) newErrors.code = "Mã OTP không được để trống.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!newPassword.trim()) newErrors.password = "Mật khẩu không được để trống.";
    else if (
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*\d).{8,}$/.test(newPassword)
    ) {
      newErrors.password =
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ in hoa, chữ thường, số và ký tự đặc biệt.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1 = async (e) => {
    e.preventDefault();
    if (!validateStep1()) return;

    try {
      await axios.post("http://localhost:5000/api/auth/request-password-reset-code", {
        email,
      });
      setStep(2);
    } catch (error) {
      setErrors({ email: error.response?.data?.message || "Lỗi gửi mã xác minh" });
    }
  };

  const handleStep2 = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-reset-code", {
        email,
        code,
      });
      setResetToken(response.data.resetToken);
      setStep(3);
    } catch (error) {
      setErrors({ code: error.response?.data?.message || "Mã xác minh không đúng" });
    }
  };

  const handleStep3 = async (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    try {
      await axios.post("http://localhost:5000/api/auth/complete-password-reset", {
        resetToken,
        newPassword,
      });
      alert("Đặt lại mật khẩu thành công!");
      navigate("/login");
    } catch (error) {
      setErrors({ password: error.response?.data?.message || "Lỗi đặt lại mật khẩu" });
    }
  };

  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#2d3748", margin: "0", overflow: "hidden" }}>
      <div className="card text-center text-white p-5" style={{ width: "500px", borderRadius: "20px", boxShadow: "0 6px 15px rgba(0, 0, 0, 0.4)", cadetsackgroundColor: "#2d3748" }}>
        <a href="/" className="btn btn-primary rounded-circle" style={{ position: "absolute", top: "10px", left: "10px", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <i className="fas fa-arrow-left"></i>
        </a>
        <div className="mb-4">
          <h1 className="fw-bold text-primary" style={{ fontSize: "80px" }}>Zola</h1>
        </div>
        {step === 1 && (
          <form onSubmit={handleStep1}>
            <p className="mb-4" style={{ color: "#a0aec0" }}>Nhập email để đặt lại mật khẩu</p>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="form-control"
                style={{ backgroundColor: "#1a202c", color: "#a0aec0", border: "1px solid #4a5568", borderRadius: "10px", padding: "15px", fontSize: "16px" }}
              />
              {errors.email && <div className="text-danger mt-1 text-start">{errors.email}</div>}
            </div>
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#3182ce", color: "white", border: "none", borderRadius: "10px", fontSize: "18px", fontWeight: "bold", padding: "15px", width: "100%" }}>
              Gửi mã xác minh
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleStep2}>
            <p className="mb-4" style={{ color: "#a0aec0" }}>Nhập mã OTP đã được gửi đến email của bạn</p>
            <div className="mb-3">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Mã OTP"
                className="form-control"
                style={{ backgroundColor: "#1a202c", color: "#a0aec0", border: "1px solid #4a5568", borderRadius: "10px", padding: "15px", fontSize: "16px" }}
              />
              {errors.code && <div className="text-danger mt-1 text-start">{errors.code}</div>}
            </div>
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#3182ce", color: "white", border: "none", borderRadius: "10px", fontSize: "18px", fontWeight: "bold", padding: "15px", width: "100%" }}>
              Xác minh
            </button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleStep3}>
            <p className="mb-4" style={{ color: "#a0aec0" }}>Nhập mật khẩu mới</p>
            <div className="mb-3">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mật khẩu mới"
                className="form-control"
                style={{ backgroundColor: "#1a202c", color: "#a0aec0", border: "1px solid #4a5568", borderRadius: "10px", padding: "15px", fontSize: "16px" }}
              />
              {errors.password && <div className="text-danger mt-1 text-start">{errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#3182ce", color: "white", border: "none", borderRadius: "10px", fontSize: "18px", fontWeight: "bold", padding: "15px", width: "100%" }}>
              Đặt lại mật khẩu
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;