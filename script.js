const form = document.getElementById("contact-form");
const message = document.getElementById("message");

form.addEventListener("submit", function(event) {
    event.preventDefault(); 

    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const messeage = form.elements["message"].value.trim();

    if (!name || !email || !messageText) {
        message.textContent = "すべて入力してください";
        message.styyle.color = "red";
    } else {
    message.textContent = "送信しました";
    message.style.color = "green";
    form.reset();
    }
});