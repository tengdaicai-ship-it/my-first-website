document.addEventListener("DOMContentLoaded", function() {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const form = document.getElementById("contact-form");
    const message = document.getElementById("result-message");
    const messagesList = document.getElementById("messages-list");

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
        
        fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: messageText
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Server response:", data);
                showSuccess("送信成功（サーバー保存）");
                form.reset();
                loadMessages();
            })
            .catch(error => {
                console.error("Error:", error);
                showError("サーバー接続失敗");
            });
            
    });

    async function loadMessages() {

        const res = await fetch("/api/contact");

        const messages = await res.json();

        if (!Array.isArray(messages)) {
            console.error("API did not return array:", messages);
            return;
        }

        messagesList.innerHTML = "";

        messages.forEach(msg => {

            const div = document.createElement("div");

            div.innerHTML = `
            <p><strong>Name:</strong> ${msg.name}</p>
            <p><strong>Email:</strong> ${msg.email}</p>
            <p><strong>Message:</strong> ${msg.message}</p>
            <button onclick="deleteMessage(${msg.id})">Delete</button>
            <hr>
            `;

            messagesList.appendChild(div);

        });
        
    }

    window.deleteMessage = async function (id) {

        if (!confirm("このメッセージを削除しますか？")) {
            return;
        }

        try {

            await fetch(`/api/contact/${id}`, {
                method: "DELETE"
            });

            loadMessages();
        
        } catch (error) {

            console.error("Delete failed:", error);

        }
    
    }

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

    function showFieldError(field, text) {
        field.textContent = text;
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

    loadMessages();
    
});