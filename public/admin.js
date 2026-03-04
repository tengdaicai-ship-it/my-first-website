async function loadMessages() {

    const res = await fetch("/api/messages");

    const messages = await res.json();

    const list = document.getElementById("list");

    messages.forEach((message) => {

        const li = document.createElement("li");

        li.textContent = message.name + " : " + message.message;

        list.appendChild(li);

    });

}

loadMessages();