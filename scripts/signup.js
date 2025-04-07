document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form");
    const phoneInput = document.getElementById("phone");
    const nameInput = document.getElementById("name");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("toggle-password");

    // Tạo các phần tử báo lỗi
    const nameError = document.createElement("div");
    nameError.className = "error-message";
    nameInput.parentNode.insertBefore(nameError, nameInput.nextSibling);

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
            togglePassword.textContent = "Ẩn"; // Đổi nút thành "Ẩn"
        } else {
            passwordInput.type = "password"; // Ẩn mật khẩu
            togglePassword.textContent = "Hiện"; // Đổi nút thành "Hiện"
        }
    });

    // Chặn không cho nhập chữ vào ô "Số điện thoại"
    phoneInput.addEventListener("input", () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, ""); // Loại bỏ tất cả ký tự không phải số
    });

    // Kiểm tra và tự động viết hoa chữ cái đầu của tên
    nameInput.addEventListener("input", () => {
        const words = nameInput.value.split(" ");
        nameInput.value = words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    });

    // Kiểm tra trường "Họ và tên"
    nameInput.addEventListener("blur", () => {
        if (nameInput.value.trim() === "") {
            nameError.textContent = "Họ và tên không được để trống.";
        } else {
            nameError.textContent = "";
        }
    });

    // Kiểm tra trường "Số điện thoại"
    phoneInput.addEventListener("blur", () => {
        if (phoneInput.value.trim() === "") {
            phoneError.textContent = "Số điện thoại không được để trống.";
        } else if (!/^[0-9]{10,11}$/.test(phoneInput.value)) {
            phoneError.textContent = "Số điện thoại phải có 10-11 chữ số.";
        } else {
            phoneError.textContent = "";
        }
    });

    // Kiểm tra trường "Mật khẩu"
    passwordInput.addEventListener("blur", () => {
        const password = passwordInput.value;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*\d).{8,}$/;

        if (password.trim() === "") {
            passwordError.textContent = "Mật khẩu không được để trống.";
        } else if (!passwordRegex.test(password)) {
            passwordError.textContent =
                "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ in hoa, chữ thường, số và ký tự đặc biệt.";
        } else {
            passwordError.textContent = "";
        }
    });

    // Xử lý khi form được submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Kiểm tra lần cuối trước khi submit
        nameInput.dispatchEvent(new Event("blur"));
        phoneInput.dispatchEvent(new Event("blur"));
        passwordInput.dispatchEvent(new Event("blur"));

        if (
            nameError.textContent === "" &&
            phoneError.textContent === "" &&
            passwordError.textContent === ""
        ) {
            // Lưu thông tin vào Local Storage
            const userData = {
                name: nameInput.value,
                phone: phoneInput.value,
                password: passwordInput.value
            };
            localStorage.setItem("user", JSON.stringify(userData));

            alert("Đăng ký thành công!");
            form.reset();

            // Chuyển hướng sang trang đăng nhập
            window.location.href = "login.html";
        }
    });
});



//Team BE có gì thay đổi cái lưu vào local storage nha