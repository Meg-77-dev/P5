const url = new URLSearchParams(window.location.search);
const id = url.get("id");
console.log(id)
const orderId = document.querySelector("#orderId")
orderId.textContent = id 