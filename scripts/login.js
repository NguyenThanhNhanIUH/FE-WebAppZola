document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("toggle-password");

    // Tạo các phần tử báo lỗi
    const phoneError = document.createElement("div");
    phoneError.className = "error-message";
    phoneInput.parentNode.insertBefore(phoneError, phoneInput.nextSibling);

    const passwordError = document.createElement("div");
    passwordError.className = "error-message";
    passwordInput.parentNode.insertBefore(passwordError, passwordInput.nextSibling);

    // Hiển thị hoặc ẩn mật khẩu
    togglePassword.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text"; // Hiển thị mật khẩu
            togglePassword.textContent = "Ẩn"; // Đổi nút thành "ẨN"
        } else {
            passwordInput.type = "password"; // Ẩn mật khẩu
            togglePassword.textContent = "Hiện"; // Đổi nút thành "HIỂN"
        }
    });

    // Chặn ký tự không phải số trong trường số điện thoại
    phoneInput.addEventListener("input", () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, ""); // Loại bỏ ký tự không phải số
    });

    //BE đổi nhaa...
    
    // Xử lý khi form được submit
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Lấy thông tin từ Local Storage
        const userData = JSON.parse(localStorage.getItem("user"));

        // Kiểm tra số điện thoại
        if (phoneInput.value.trim() === "") {
            phoneError.textContent = "Số điện thoại không được để trống.";
        } else if (!userData || userData.phone !== phoneInput.value.trim()) {
            phoneError.textContent = "Số điện thoại không khớp.";
        } else {
            phoneError.textContent = "";
        }

        // Kiểm tra mật khẩu
        if (passwordInput.value.trim() === "") {
            passwordError.textContent = "Mật khẩu không được để trống.";
        } else if (!userData || userData.password !== passwordInput.value.trim()) {
            passwordError.textContent = "Mật khẩu không khớp.";
        } else {
            passwordError.textContent = "";
        }

        // Nếu không có lỗi, chuyển hướng
        if (phoneError.textContent === "" && passwordError.textContent === "") {
            alert("Đăng nhập thành công!");
            window.location.href = "home.html";
        }
    });
});