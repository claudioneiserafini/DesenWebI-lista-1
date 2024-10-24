document.addEventListener("DOMContentLoaded", () => {
    const orderTotalElement = document.getElementById("order-total");
    let total = localStorage.getItem("orderTotal") || "0,00";
    orderTotalElement.textContent = `R$ ${total}`;

    const toggleAddressForm = document.getElementById("toggle-address-form");
    const addressForm = document.getElementById("address-form");
    const addressInput = document.getElementById("address-input");
    const saveAddressButton = document.getElementById("save-address");
    const savedAddressElement = document.getElementById("saved-address");
    const removeAddressButton = document.getElementById("remove-address");

    const savedAddress = localStorage.getItem("savedAddress");
    if (savedAddress) {
        savedAddressElement.textContent = savedAddress;
        removeAddressButton.classList.remove("hidden");
    }

    toggleAddressForm.addEventListener("click", () => {
        addressForm.classList.toggle("hidden");
    });

    saveAddressButton.addEventListener("click", () => {
        const address = addressInput.value;
        if (address) {
            localStorage.setItem("savedAddress", address);
            savedAddressElement.textContent = address;
            addressForm.classList.add("hidden");
            addressInput.value = "";
            removeAddressButton.classList.remove("hidden");
        }
    });

    removeAddressButton.addEventListener("click", () => {
        localStorage.removeItem("savedAddress");
        savedAddressElement.textContent = "Nenhum endereço salvo";
        removeAddressButton.classList.add("hidden");
    });

    document.getElementById("confirm-order").addEventListener("click", () => {
        alert("Pedido confirmado!");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
    });
});
