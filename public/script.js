document.addEventListener("DOMContentLoaded", function() {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const form = document.getElementById("contact-form");
    const message = document.getElementById("result-message");

    const nameInput = form.elements["name"];
    const emailInput = form.elements["email"];
    const messageInput = form.elements["message"];

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    nameInput.addEventListener("input", function() {
            toggleRequired(nameInput);
        });

    messageInput.addEventListener("input", function() {
            toggleRequired(messageInput);
        });

    emailInput.addEventListener("input", function() {
            validateEmailLive(emailInput);
        });

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
             
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const messageText = messageInput.value.trim();

        clearErrors();
        clearStyles(nameInput, emailInput, messageInput);

        let hasError = false;

        if (!name) {
            showFieldError(nameError,"名前を入力してください");
            nameInput.classList.add("error");
            hasError = true;
        }

        if (!email) {
            showFieldError(emailError, "メールを入力してください");
            emailInput.classList.add("error");
            hasError = true;
        } else if (!emailPattern.test(email)) {
            showFieldError(emailError, "正しいメールアドレスを入力してください");
            emailInput.classList.add("error");
            hasError = true;
        }

        if (!messageText) {
            showFieldError(messageError, "内容を入力してください");
            messageInput.classList.add("error");
            hasError = true;
        }

        if (hasError) return;

        fetch("/api/test")
            .then(response => response.json())
            .then(data => {
                console.log("Server response:", data);
                showSuccess("サーバー接続成功");
                form.reset();
            })
            .catch(error => {
                console.error("Error:", error);
                showError("サーバー接続失敗");
            });
            
    });

    function showError(text) {
        message.textContent = text;
        message.style.color = "red";
    }

    function showSuccess(text) {
        message.textContent = text;
        message.style.color = "green";
    }

    function clearErrors() {
        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
    }

    function showFieldError(Field, text) {
        Field.textContent = text;
    }

    function clearStyles(...inputs) {
        inputs.forEach(input => {
            input.classList.remove("error");
            input.classList.remove("success");
        });
    }

    function toggleRequired(input) {
        if (input.value.trim() === "") {
            input.classList.add("error");
            input.classList.remove("success");
        } else {
            input.classList.remove("error");
            input.classList.add("success");
        }
    }

    function validateEmailLive(input) {

        if (input.value.trim() === "") {
            input.classList.add("error");
            input.classList.remove("success")
            return;
        }

        if (!emailPattern.test(input.value.trim())) {
            input.classList.add("error");
            input.classList.remove("success");
        } else {
            input.classList.remove("error");
            input.classList.add("success");
        }
    }

});