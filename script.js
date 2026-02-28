document.addEventListener("DOMContentLoaded", function() {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const form = document.getElementById("contact-form");
    const message = document.getElementById("result-message");

    const nameInput = form.elements["name"];
    const emailInput = form.elements["email"];
    const messageInput = form.elements["message"];

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

        clearStyles(nameInput, emailInput, messageInput);

        if (!name || !email || !messageText) {
            showError("すべて入力してください");
            if (!name) nameInput.classList.add("error");
            if (!email) emailInput.classList.add("error");
            if (!messageText) messageInput.classList.add("error");
            return;
        }

        if (!emailPattern.test(email)) {
            showError("正しいメールアドレスを入力してください")
            emailInput.classList.add("error")
            return;
        }

        showSuccess("送信しました");
        nameInput.classList.add("success");
        emailInput.classList.add("success")
        messageInput.classList.add("success");
    
        
        form.reset();
    });

    function showError(text) {
        message.textContent = text;
        message.style.color = "red";
    }

    function showSuccess(text) {
        message.textContent = text;
        message.style.color = "green";
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