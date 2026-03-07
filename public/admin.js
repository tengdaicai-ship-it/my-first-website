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

        const del = document.createElement("td");

        const button = document.createElement("button");
        button.textContent = "Delete";

        button.addEventListener("click", async () => {

            await fetch(`/api/messages/${message.id}`, {
                method: "DELETE"
            });

            loadMessages();

        });

        del.appendChild(button);

        tr.appendChild(name);
        tr.appendChild(email);
        tr.appendChild(text);
        tr.appendChild(del);

        list.appendChild(tr);

    });

}

loadMessages();