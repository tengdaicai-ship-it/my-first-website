async function loadMessages() {

    const res = await fetch("/api/messages");
    const messages = await res.json();

    const list = document.getElementById("list");

    list.innerHTML = "";

    messages.forEach((message) => {

        const tr = document.createElement("tr");

        const name = document.createElement("td");
        name.textContent = message.name;

        const email = document.createElement("td");
        email.textContent = message.email;

        const text = document.createElement("td");
        text.textContent = message.message;

        tr.appendChild(name);
        tr.appendChild(email);
        tr.appendChild(text);

        list.appendChild(tr);

    });

}

loadMessages();