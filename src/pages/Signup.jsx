import { useState } from "react";
import "../styles/global.css";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const capitalizeName = (value) => {
    return value
      .split(" ")
      .map((word) =>
        word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ""
      )
      .join(" ");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Họ và tên không được để trống.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống.";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải có 10-11 chữ số.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Mật khẩu không được để trống.";
    } else if (
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*\d).{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ in hoa, chữ thường, số và ký tự đặc biệt.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    localStorage.setItem("user", JSON.stringify(formData));
    alert("Đăng ký thành công!");
    navigate("/login");
  };

  return (
    <div
      className="vh-100 vw-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#2d3748", margin: "0", overflow: "hidden" }}
    >
      <div
        className="signup-container"
        style={{
          position: "relative",
          height: "auto",
          marginTop: "30px",
        }}
      >
        <a
          href="/"
          className="back-button"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            color: "white",
            textDecoration: "none",
            fontSize: "20px",
          }}
        >
          <i className="fas fa-arrow-left"></i>
        </a>

        <div className="app-title">
          <h1 style={{ fontSize: "80px", marginTop: "50px", marginBottom: "10px" }}>Zola</h1>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <p className="form-title" style={{ marginTop: "40px" }}>
            Vui lòng nhập thông tin để tạo tài khoản
          </p>

          <div className="input-wrapper" style={{ marginTop: "2px" }}>
            <input
              type="text"
              placeholder="Họ và tên"
              className="input-field"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: capitalizeName(e.target.value),
                })
              }
              onBlur={validate}
            />
            <div className="error-message">{errors.name || "\u00A0"}</div>
          </div>

          <div className="input-wrapper" style={{ marginTop: "2px" }}>
            <input
              type="tel"
              placeholder="Số điện thoại"
              className="input-field"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value.replace(/\D/g, ""),
                })
              }
              onBlur={validate}
            />
            <div className="error-message">{errors.phone || "\u00A0"}</div>
          </div>

          <div className="input-wrapper" style={{ marginTop: "2px" }}>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Tạo mật khẩu"
                className="input-field"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                onBlur={validate}
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>
            <div className="error-message">{errors.password || "\u00A0"}</div>
          </div>

          <button
            type="submit"
            className="signup-button"
            style={{ fontSize: "20px", padding: "12px" }}
          >
            Tạo tài khoản
          </button>
        </form>
      </div>
    </div>
  );
}
