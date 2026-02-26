document.addEventListener("DOMContentLoaded", function()
{

    const form = document.getElementById("contact-form");
    const message = document.getElementById("message");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        const nameInput = form.elements["name"];
        const emailInput = form.elements["email"];
        const messageInput = form.elements["message"];

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const messageText = messageInput.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

});