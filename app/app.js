const sockt = new WebSocket("ws://localhost:3000");

function sendMessage(e) {
    e.preventDefault();
    const input = document.querySelector("input");
    if (input.value) {
        sockt.send(input.value);
        input.value = "";
    }
    input.focus();
}
document.querySelector("form").addEventListener("submit", sendMessage);

//Listen for message
sockt.addEventListener("message", async ({ data }) => {
    const li = document.createElement("li");
    li.textContent = await data.text();
    document.querySelector("ul").appendChild(li);
});
